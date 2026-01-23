'use client';

import Image from 'next/image';

interface EbookCardProps {
  id: string;
  title: string;
  price: number;
  coverImage: string;
  testimonial: string | null;
  slug: string;
}

export default function EbookCard({
  title,
  price,
  coverImage,
  testimonial,
  slug,
}: EbookCardProps) {
  const formattedPrice = (price / 100).toFixed(2);

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
    <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg overflow-hidden hover:border-[var(--accent)] transition-all duration-300 flex flex-col">
      <div className="relative aspect-[3/4] bg-[var(--background)]">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-2xl font-bold text-[var(--accent)] mb-3">
          ${formattedPrice}
        </p>
        {testimonial && (
          <p className="text-sm text-[var(--muted)] italic mb-4 flex-1">
            &quot;{testimonial}&quot;
          </p>
        )}
        <button
          onClick={handleBuyNow}
          className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold py-3 px-4 rounded transition-colors duration-200 uppercase tracking-wide min-h-[44px]"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
