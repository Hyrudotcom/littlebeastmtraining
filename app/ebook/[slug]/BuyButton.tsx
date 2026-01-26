'use client';

import { Button } from '@/components/ui/button';

interface BuyButtonProps {
  slug: string;
}

export default function BuyButton({ slug }: BuyButtonProps) {
  const handleBuyNow = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <Button
      onClick={handleBuyNow}
      className="w-full md:w-auto px-12 font-bold uppercase tracking-wide text-lg py-6 shadow-[0_0_20px_rgba(255,107,53,0.4)] hover:shadow-[0_0_30px_rgba(255,107,53,0.6)]"
      size="lg"
    >
      Buy Now
    </Button>
  );
}
