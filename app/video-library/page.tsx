import Link from 'next/link';
import { Play } from 'lucide-react';

const categories = [
  {
    title: 'Calisthenics',
    description: 'Bodyweight strength exercises',
    slug: 'calisthenics',
    image: '/images/lbm-blueprint.png',
  },
  {
    title: 'Weighted Dips',
    description: 'Heavy dip progressions & techniques',
    slug: 'weighted-dips',
    image: '/images/elite-weighted-dips.png',
  },
  {
    title: 'Handstands',
    description: 'Balance, presses & handstand skills',
    slug: 'handstands',
    image: '/images/hs-press.png',
  },
  {
    title: 'Ring Training',
    description: 'Gymnastics ring exercises',
    slug: 'ring-training',
    image: '/images/lbm-blueprint.png',
  },
  {
    title: 'Mobility',
    description: 'Flexibility & mobility flows',
    slug: 'mobility',
    image: '/images/lbm-diet.png',
  },
  {
    title: 'Tutorials',
    description: 'Skill breakdowns & technique tips',
    slug: 'tutorials',
    image: '/images/lbm-blueprint.png',
  },
];

export default function VideoLibraryPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-primary drop-shadow-[0_0_25px_rgba(255,107,53,0.6)]">Video</span> Library
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            This video library is designed for every level of athlete. Learn from LittleBeastM&apos;s years of training experience in calisthenics, weighted training, and skill development.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/video-library/${category.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card hover:border-primary transition-all duration-300"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-300"
                style={{ backgroundImage: `url(${category.image})` }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

              {/* Content */}
              <div className="relative p-8 min-h-[200px] flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-full bg-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Play size={20} />
                  </div>
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  {category.description}
                </p>
                <div className="mt-4 text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View More →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-16 text-center">
          <div className="inline-block px-6 py-3 bg-primary/10 border border-primary/30 rounded-full">
            <p className="text-muted-foreground">
              More videos coming soon! Follow on{' '}
              <a
                href="https://www.youtube.com/@littlebeastmtraining"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-semibold"
              >
                YouTube
              </a>
              {' '}for the latest content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
