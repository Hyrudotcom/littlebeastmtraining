export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          About <span className="text-primary drop-shadow-[0_0_20px_rgba(255,107,53,0.7)]">The LBM Blueprint</span>
        </h1>

        <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
          <p>
            <span className="text-primary font-semibold">The LBM Blueprint</span> is a complete training and lifestyle system created by{' '}
            <span className="text-foreground font-semibold">LittleBeastM</span>. Known for his unique blend of heavyweight calisthenics and traditional strength training, this program is designed to build a body that is not only strong and aesthetic, but durable, mobile, and highly functional. The approach combines advanced bodyweight training, heavy lifting, joint preparation, mobility, breathing, and meditation into one structured method.
          </p>

          <p>
            Despite a heavier build than most calisthenics athletes, LittleBeastM is recognized for performing elite weighted strength feats such as{' '}
            <span className="text-foreground font-semibold">90kg+ weighted pull-ups</span> and{' '}
            <span className="text-foreground font-semibold">100kg+ weighted dips</span>, alongside advanced skill-based movements including{' '}
            <span className="text-foreground font-semibold">front lever holds</span>,{' '}
            <span className="text-foreground font-semibold">90-degree push-ups</span>,{' '}
            <span className="text-foreground font-semibold">strict muscle-ups</span>,{' '}
            <span className="text-foreground font-semibold">handstand push-ups</span>, and{' '}
            <span className="text-foreground font-semibold">high-level ring work</span>.
          </p>

          <p>
            With years of coaching experience, a strong online presence, and collaborations on programs like{' '}
            <span className="text-foreground font-semibold">Bodyweight Evolution</span>, The LBM Blueprint reflects a philosophy centered on longevity, recovery, mindset, and intelligent programming.
          </p>

          <p className="text-foreground font-medium text-xl border-l-4 border-primary pl-6 py-2">
            This is not just a workout plan, but a foundation for turning training into a sustainable lifestyle.
          </p>
        </div>
      </div>
    </div>
  );
}
