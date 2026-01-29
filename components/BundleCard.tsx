'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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
    <Card className="overflow-hidden border-primary/50 bg-gradient-to-r from-primary/15 via-primary/5 to-primary/15 hover:border-primary transition-all duration-300 relative">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-primary/5 blur-xl" />

      <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left side - Info */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-block px-4 py-1 bg-primary/20 rounded-full text-primary text-sm font-semibold mb-4">
            BEST VALUE
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-2">Complete LBM Bundle</h3>
          <p className="text-muted-foreground text-lg mb-4">
            THE LBM BLUEPRINT + Elite Weighted Dips + Handstand Press + LBM Nutrition
          </p>
        </div>

        {/* Right side - Price & Button */}
        <div className="flex flex-col items-center gap-4 min-w-[250px]">
          <div className="flex items-center gap-4">
            <span className="text-2xl text-muted-foreground line-through">$86</span>
            <span className="text-4xl md:text-5xl font-bold text-primary drop-shadow-[0_0_15px_rgba(255,107,53,0.6)]">$55</span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Save $31 on all 4 ebooks</p>
          <Button
            onClick={handleBuyBundle}
            className="w-full font-bold uppercase tracking-wide text-lg py-6 px-12 shadow-[0_0_25px_rgba(255,107,53,0.4)] hover:shadow-[0_0_35px_rgba(255,107,53,0.6)]"
            size="lg"
          >
            Get The Bundle
          </Button>
        </div>
      </div>
    </Card>
  );
}
