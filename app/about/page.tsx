export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          About <span className="text-primary drop-shadow-[0_0_20px_rgba(255,107,53,0.7)]">LittleBeastM</span>
        </h1>

        <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
          <p>
            <span className="text-primary font-semibold">LittleBeastM</span> is a prominent calisthenics coach and athlete known for his focus on weighted calisthenics and high-intensity bodyweight training. He gained significant recognition in the early 2010s and 2020s for his impressive strength feats, such as performing{' '}
            <span className="text-foreground font-semibold">90kg pull-ups</span>,{' '}
            <span className="text-foreground font-semibold">110kg weighted dips x 3</span>, unofficial heavyweight world record of{' '}
            <span className="text-foreground font-semibold">10 90-degree push-ups</span> in one set, advanced calisthenic skills, and high rep superset training — all while maintaining a muscular but heavy physique.
          </p>

          {/* Bar-Barians Section */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">The Bar-Barians Legacy</h2>
            <p>
              At just <span className="text-foreground font-semibold">17 years old</span>, LBM was the first international and youngest member to join{' '}
              <span className="text-primary font-semibold">The Bar-Barians</span>. To join, it was required to complete the Bar-Barian Requirements: <span className="text-foreground font-semibold">40 Dips, 20 Pull-ups, 50 Push-ups, and 5 Muscle-ups</span> — all in under 5 minutes!
            </p>
            <p className="mt-4">
              In that early stage of the calisthenics world, this was highly impressive and respected. LBM started helping and inspiring people through the Bar-Barian forums with training routines and challenges.
            </p>
          </div>

          {/* Training Philosophy */}
          <p>
            Coming from a pure calisthenic background, LBM now advocates for{' '}
            <span className="text-primary font-semibold">hybrid training</span> — a combination of calisthenics, weightlifting, handbalancing, conditioning, and mobility, so as little weak links are left behind.
          </p>

          {/* What LBM Does */}
          <p>
            LBM provides <span className="text-foreground font-semibold">online coaching</span>,{' '}
            <span className="text-foreground font-semibold">personal training</span>,{' '}
            <span className="text-foreground font-semibold">training programs</span>, and{' '}
            <span className="text-foreground font-semibold">e-books</span>. He is also called by many as{' '}
            <span className="text-primary font-semibold">&quot;Sensei&quot;</span>, as he inspires people to change their lifestyle, bad habits, diet, and mindset.
          </p>

          {/* FitnessFAQs Collaboration */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">FitnessFAQs Collaboration</h2>
            <p>
              In the early days of FitnessFAQs, LBM co-authored the popular{' '}
              <span className="text-foreground font-semibold">12-week Bodyweight Evolution</span> program with Daniel Vadnal of FitnessFAQs — one of the first FitnessFAQs e-books that was very well received by many.
            </p>
          </div>

          {/* Still Active */}
          <p>
            LBM is still active on{' '}
            <a
              href="https://www.youtube.com/@littlebeastmtraining"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-semibold"
            >
              YouTube
            </a>
            {' '}and{' '}
            <a
              href="https://instagram.com/littlebeastm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-semibold"
            >
              Instagram
            </a>
            , where he shares workout routines, raw training videos, tutorials, vlogs, lifestyle and training tips.
          </p>

          {/* Quote */}
          <p className="text-foreground font-medium text-xl border-l-4 border-primary pl-6 py-2">
            Train smart. Stay consistent. Build a bulletproof body.
          </p>
        </div>
      </div>
    </div>
  );
}
