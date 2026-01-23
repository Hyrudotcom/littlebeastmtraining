import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import { sendPurchaseConfirmation } from '@/lib/email';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const ebookId = session.metadata?.ebookId;

      if (!ebookId) {
        console.error('No ebookId in session metadata');
        return NextResponse.json({ received: true });
      }

      const existingOrder = await prisma.order.findUnique({
        where: { stripeSessionId: session.id },
      });

      if (existingOrder) {
        console.log('Order already exists for session:', session.id);
        return NextResponse.json({ received: true });
      }

      const ebook = await prisma.ebook.findUnique({
        where: { id: ebookId },
      });

      if (!ebook) {
        console.error('Ebook not found:', ebookId);
        return NextResponse.json({ received: true });
      }

      const downloadToken = uuidv4();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

      const order = await prisma.order.create({
        data: {
          email: session.customer_email || '',
          stripeSessionId: session.id,
          status: 'completed',
          amount: session.amount_total || ebook.price,
          ebookId: ebook.id,
          downloads: {
            create: {
              token: downloadToken,
              expiresAt,
            },
          },
        },
        include: {
          ebook: true,
          downloads: true,
        },
      });

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const downloadUrl = `${baseUrl}/download/${downloadToken}`;

      if (session.customer_email) {
        await sendPurchaseConfirmation({
          to: session.customer_email,
          ebookTitle: ebook.title,
          downloadUrl,
        });
      }

      console.log('Order created:', order.id);
    } catch (error) {
      console.error('Error processing checkout.session.completed:', error);
      return NextResponse.json(
        { error: 'Error processing webhook' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
