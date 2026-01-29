'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface EbookCardProps {
  id: string;
  title: string;
  price: number;
  coverImage: string;
  slug: string;
}

export default function EbookCard({
  title,
  price,
  coverImage,
  slug,
}: EbookCardProps) {
  const formattedPrice = (price / 100).toFixed(2);

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
    <Link href={`/ebook/${slug}`}>
      <Card className="overflow-hidden border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur-sm transition-all duration-300 flex flex-col cursor-pointer group">
        <div className="relative aspect-[3/4] bg-background/50 overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </div>
        <CardContent className="p-5 flex flex-col flex-1">
          <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">{title}</h3>
          <p className="text-2xl font-bold text-primary drop-shadow-[0_0_10px_rgba(255,107,53,0.4)]">
            ${formattedPrice}
          </p>
        </CardContent>
        <CardFooter className="p-5 pt-0">
          <Button
            onClick={handleBuyNow}
            className="w-full font-semibold uppercase tracking-wide"
            size="lg"
          >
            Buy Now
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
