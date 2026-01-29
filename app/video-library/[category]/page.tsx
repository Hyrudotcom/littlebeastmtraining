import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

const videos = [
  {
    id: 'MlhgKRolhzI',
    title: '100KG X 2 Military Press at 90KG BW!!!',
    views: '236K views',
  },
  {
    id: 'Ovk9mm-Y-i4',
    title: 'The Handstand Push-up MONSTER',
    views: '173K views',
  },
  {
    id: 'Bisbty-wy-A',
    title: 'Front Lever Training Tutorial',
    views: '173K views',
  },
  {
    id: 'eWy6b2Esurw',
    title: 'Calisthenics Athlete does Bench Press for first time!',
    views: '158K views',
  },
  {
    id: '1K_HuIzfIb4',
    title: '7 Exercises to Increase your Pull-ups',
    views: '96K views',
  },
  {
    id: 'PpfIaQwB0dQ',
    title: 'Huge Biceps, 90KG chin ups and Pause Squats',
    views: '95K views',
  },
  {
    id: 'FPCB9eR7NbU',
    title: '100KG Dips Park Workout!',
    views: '92K views',
  },
  {
    id: 'Sgpf98ifJt8',
    title: 'LITTLEBEASTM',
    views: '85K views',
  },
  {
    id: 'Ac8T5E3jc0s',
    title: '10 90 Degree Push-ups World Record at 90kg BW!',
    views: '79K views',
  },
];

const categoryInfo: Record<string, { title: string; description: string }> = {
  calisthenics: {
    title: 'Calisthenics',
    description: 'Bodyweight strength exercises and training videos',
  },
  'weighted-dips': {
    title: 'Weighted Dips',
    description: 'Heavy dip progressions, techniques and world-class performances',
  },
  handstands: {
    title: 'Handstands',
    description: 'Balance work, presses and handstand skill tutorials',
  },
  'ring-training': {
    title: 'Ring Training',
    description: 'Gymnastics ring exercises and progressions',
  },
  mobility: {
    title: 'Mobility',
    description: 'Flexibility, mobility flows and stretching routines',
  },
  tutorials: {
    title: 'Tutorials',
    description: 'Skill breakdowns, technique tips and how-to guides',
  },
};

interface Props {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const info = categoryInfo[category];

  if (!info) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link
          href="/video-library"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to Video Library
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-primary drop-shadow-[0_0_20px_rgba(255,107,53,0.6)]">{info.title}</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            {info.description}
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300">
                {/* YouTube Thumbnail */}
                <img
                  src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-[0_0_20px_rgba(255,107,53,0.6)] group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {video.views}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* YouTube CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://www.youtube.com/@littlebeastmtraining"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,107,53,0.4)]"
          >
            Watch More on YouTube
          </a>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return Object.keys(categoryInfo).map((category) => ({
    category,
  }));
}
