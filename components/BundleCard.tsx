'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export default function BundleCard() {
  const handleBuyBundle = async () => {
    try {
      const response = await fetch('/api/checkout/bundle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
    <Card className="overflow-hidden border-primary/50 bg-gradient-to-br from-primary/10 via-background to-primary/5 hover:border-primary transition-all duration-300 relative">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-primary/5 blur-xl" />

      <CardContent className="p-8 text-center relative">
        <div className="inline-block px-4 py-1 bg-primary/20 rounded-full text-primary text-sm font-semibold mb-4">
          BEST VALUE
        </div>
        <h3 className="text-2xl font-bold mb-2">Complete LBM Bundle</h3>
        <p className="text-muted-foreground mb-6">
          Get all 4 ebooks and save $31
        </p>
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-2xl text-muted-foreground line-through">$86</span>
          <span className="text-4xl font-bold text-primary drop-shadow-[0_0_15px_rgba(255,107,53,0.6)]">$55</span>
        </div>
        <p className="text-sm text-muted-foreground">
          THE LBM BLUEPRINT + Elite Weighted Dips + Handstand Press + LBM Nutrition
        </p>
      </CardContent>
      <CardFooter className="p-8 pt-0 relative">
        <Button
          onClick={handleBuyBundle}
          className="w-full font-bold uppercase tracking-wide text-lg py-6 shadow-[0_0_20px_rgba(255,107,53,0.4)] hover:shadow-[0_0_30px_rgba(255,107,53,0.6)]"
          size="lg"
        >
          Get The Bundle
        </Button>
      </CardFooter>
    </Card>
  );
}
