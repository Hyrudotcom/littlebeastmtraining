import { prisma } from '@/lib/prisma';
import EbookCard from '@/components/EbookCard';

export default async function HomePage() {
  const ebooks = await prisma.ebook.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight">
          Train Like a <span className="text-[var(--accent)]">Beast</span>
        </h1>
        <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">
          Premium training programs, nutrition guides, and mindset content to help you reach your athletic potential.
        </p>
      </div>

      {ebooks.length === 0 ? (
        <p className="text-center text-[var(--muted)]">
          No ebooks available at the moment. Check back soon!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {ebooks.map((ebook) => (
            <EbookCard
              key={ebook.id}
              id={ebook.id}
              title={ebook.title}
              price={ebook.price}
              coverImage={ebook.coverImage}
              testimonial={ebook.testimonial}
              slug={ebook.slug}
            />
          ))}
        </div>
      )}
    </div>
  );
}
