import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const sessionId = params.session_id;

  if (!sessionId) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Invalid Session</h1>
        <p className="text-muted-foreground mb-8">
          No checkout session found. Please try again.
        </p>
        <Button asChild size="lg">
          <Link href="/">Return to Store</Link>
        </Button>
      </div>
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return (
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Payment Pending</h1>
          <p className="text-muted-foreground mb-8">
            Your payment is still being processed. Please wait a moment and refresh this page.
          </p>
          <Button asChild size="lg">
            <Link href="/">Return to Store</Link>
          </Button>
        </div>
      );
    }

    const ebookId = session.metadata?.ebookId;
    const ebook = ebookId
      ? await prisma.ebook.findUnique({ where: { id: ebookId } })
      : null;

    const order = await prisma.order.findUnique({
      where: { stripeSessionId: sessionId },
      include: {
        downloads: {
          where: { used: false },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    const downloadToken = order?.downloads[0]?.token;

    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">Thank You!</h1>
          <p className="text-muted-foreground">
            Your purchase was successful. Check your email for the download link.
          </p>
        </div>

        {ebook && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex gap-6">
                <div className="relative w-24 h-32 flex-shrink-0">
                  <Image
                    src={ebook.coverImage}
                    alt={ebook.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">{ebook.title}</h2>
                  <p className="text-muted-foreground text-sm mb-4">
                    by {ebook.author}
                  </p>
                  <p className="text-primary font-bold">
                    ${(ebook.price / 100).toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {downloadToken && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Download Your Ebook</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Click the button below to download your ebook. This link expires in 24 hours and can only be used once.
              </p>
              <Button asChild className="w-full" size="lg">
                <Link href={`/download/${downloadToken}`}>Download Now</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="text-center">
          <p className="text-muted-foreground text-sm mb-4">
            A confirmation email with the download link has been sent to{' '}
            <strong>{session.customer_email}</strong>
          </p>
          <Link
            href="/"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Success page error:', error);
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Something Went Wrong</h1>
        <p className="text-muted-foreground mb-8">
          We could not retrieve your order details. Please check your email for the download link.
        </p>
        <Button asChild size="lg">
          <Link href="/">Return to Store</Link>
        </Button>
      </div>
    );
  }
}
