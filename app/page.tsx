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
      <div className="text-center py-12 md:py-20 mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold cursor-default group">
          <span className="text-primary drop-shadow-[0_0_25px_rgba(255,107,53,0.6)] transition-all duration-300 group-hover:drop-shadow-[0_0_40px_rgba(255,107,53,1)]">Real</span> <span className="transition-all duration-300 group-hover:text-white">Programs.</span> <span className="text-primary drop-shadow-[0_0_25px_rgba(255,107,53,0.6)] transition-all duration-300 group-hover:drop-shadow-[0_0_40px_rgba(255,107,53,1)]">Real</span> <span className="transition-all duration-300 group-hover:text-white">Results.</span>
        </h1>
      </div>

      {sortedEbooks.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No ebooks available at the moment. Check back soon!
        </p>
      ) : (
        <>
          {/* Ebooks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto">
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

          {/* Bundle Section - Bottom */}
          <div className="max-w-4xl mx-auto mt-16">
            <BundleCard />
          </div>
        </>
      )}
    </div>
  );
}
