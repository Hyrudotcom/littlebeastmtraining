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
      <Card className="overflow-hidden hover:border-primary transition-all duration-300 flex flex-col cursor-pointer group">
        <div className="relative aspect-[3/4] bg-background overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-2xl font-bold text-primary">
            ${formattedPrice}
          </p>
        </CardContent>
        <CardFooter className="p-5 pt-0">
          <Button
            onClick={handleBuyNow}
            className="w-full font-bold uppercase tracking-wide"
            size="lg"
          >
            Buy Now
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
