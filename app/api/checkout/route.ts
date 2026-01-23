import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug } = body;

    if (!slug) {
      return NextResponse.json(
        { error: 'Ebook slug is required' },
        { status: 400 }
      );
    }

    const ebook = await prisma.ebook.findUnique({
      where: { slug },
    });

    if (!ebook) {
      return NextResponse.json({ error: 'Ebook not found' }, { status: 404 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: ebook.title,
              description: ebook.description.substring(0, 500),
              images: ebook.coverImage.startsWith('http')
                ? [ebook.coverImage]
                : [`${baseUrl}${ebook.coverImage}`],
            },
            unit_amount: ebook.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: baseUrl,
      customer_email: undefined,
      allow_promotion_codes: true,
      metadata: {
        ebookId: ebook.id,
        ebookSlug: ebook.slug,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
