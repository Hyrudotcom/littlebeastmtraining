import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

export async function POST() {
  try {
    // Get all ebooks for the bundle
    const ebooks = await prisma.ebook.findMany({
      where: {
        slug: {
          in: ['the-lbm-blueprint', 'elite-weighted-dips', 'handstand-press-program', 'lbm-nutrition'],
        },
      },
    });

    if (ebooks.length !== 4) {
      return NextResponse.json(
        { error: 'Bundle ebooks not found' },
        { status: 404 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Complete LBM Bundle',
              description:
                'Get all 4 ebooks: THE LBM BLUEPRINT, Elite Weighted Dips, Handstand Press Program, and LBM Nutrition',
            },
            unit_amount: 5500, // $55
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: baseUrl,
      allow_promotion_codes: true,
      metadata: {
        isBundle: 'true',
        ebookIds: ebooks.map((e) => e.id).join(','),
        ebookSlugs: ebooks.map((e) => e.slug).join(','),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Bundle checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
