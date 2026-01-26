import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import BuyButton from './BuyButton';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EbookPage({ params }: Props) {
  const { slug } = await params;

  const ebook = await prisma.ebook.findUnique({
    where: { slug },
  });

  if (!ebook) {
    notFound();
  }

  const formattedPrice = (ebook.price / 100).toFixed(2);

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Cover Image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl blur-2xl" />
            <div className="absolute -inset-[2px] bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40 rounded-2xl" />
            <Image
              src={ebook.coverImage}
              alt={ebook.title}
              width={500}
              height={667}
              className="relative rounded-2xl w-full shadow-2xl"
              priority
            />
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {ebook.title}
            </h1>
            <p className="text-muted-foreground mb-6">
              By <span className="text-foreground">{ebook.author}</span>
            </p>

            <div className="text-4xl font-bold text-primary drop-shadow-[0_0_15px_rgba(255,107,53,0.5)] mb-6">
              ${formattedPrice}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {ebook.description}
            </p>

            <BuyButton slug={ebook.slug} />
          </div>
        </div>

        {/* Table of Contents */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">
            What&apos;s Inside
          </h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <pre className="whitespace-pre-wrap text-muted-foreground font-sans leading-relaxed">
              {ebook.tableOfContents}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const ebooks = await prisma.ebook.findMany({
    select: { slug: true },
  });

  return ebooks.map((ebook) => ({
    slug: ebook.slug,
  }));
}
