import { prisma } from '@/lib/prisma';
import EbookCard from '@/components/EbookCard';
import BundleCard from '@/components/BundleCard';

// Custom order for ebooks
const ebookOrder = [
  'the-lbm-blueprint',
  'elite-weighted-dips',
  'handstand-press-program',
  'lbm-nutrition',
];

export default async function HomePage() {
  const ebooks = await prisma.ebook.findMany();

  // Sort ebooks by custom order
  const sortedEbooks = ebooks.sort((a, b) => {
    const aIndex = ebookOrder.indexOf(a.slug);
    const bIndex = ebookOrder.indexOf(b.slug);
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center py-16 md:py-24 mb-12">
        <h1 className="text-3xl md:text-4xl font-bold max-w-3xl mx-auto leading-tight">
          Train with <span className="text-primary">LittleBeastM&apos;s</span> knowledge and years of experience.
        </h1>
      </div>

      {sortedEbooks.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No ebooks available at the moment. Check back soon!
        </p>
      ) : (
        <>
          {/* Bundle Section - First */}
          <div className="max-w-md mx-auto mb-16">
            <BundleCard />
          </div>

          {/* Ebooks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {sortedEbooks.map((ebook) => (
              <EbookCard
                key={ebook.id}
                id={ebook.id}
                title={ebook.title}
                price={ebook.price}
                coverImage={ebook.coverImage}
                slug={ebook.slug}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
