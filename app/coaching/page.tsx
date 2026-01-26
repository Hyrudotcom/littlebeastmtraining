import { Mail } from 'lucide-react';

export default function CoachingPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Online <span className="text-primary drop-shadow-[0_0_20px_rgba(255,107,53,0.7)]">Coaching</span>
        </h1>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Personalized 3-month training program tailored to your goals
        </p>

        <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
          {/* Program Structure */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">The Program</h2>
            <p className="mb-4">
              I offer a <span className="text-foreground font-semibold">3-month program</span> split into 3 phases of 4 weeks each. Each phase is custom-built for your goals, current level, and needs.
            </p>
            <p>
              The program includes everything: warm-ups, preparations, training, and more. Most exercises are shown on video and explained in detail.
            </p>
          </div>

          {/* Philosophy */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">The Approach</h2>
            <p className="mb-4">
              We work to build a <span className="text-foreground font-semibold">healthy, mobile, strong, bullet-proof body</span> while working toward your goals.
            </p>
            <p>
              Getting healthy, stronger, fixing weak links, injuries, and building a solid foundation comes first. Without a good foundation, we won&apos;t get anywhere. We work realistically, step by step towards your goals in the right way.
            </p>
          </div>

          {/* Video Coaching */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Video Coaching</h2>
            <p className="mb-4">
              In the first week of each phase, you&apos;ll record your exercises on video. This allows me to see if you&apos;re performing everything correctly and coach you optimally - making program adjustments if needed.
            </p>
            <p>
              After every month, a progress video is sent in to evaluate what we need to work on in the next phase. We&apos;ll discuss and refine each phase to be better than the last.
            </p>
          </div>

          {/* Support */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ongoing Support</h2>
            <p>
              Throughout coaching, we keep in contact as much as possible - the more the better. I answer questions ASAP and check in regularly. Nothing goes unanswered. The more effort you put into communication, the more you&apos;ll get out of this.
            </p>
          </div>

          {/* What I Work With */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Goals I Work With</h2>
            <div className="flex flex-wrap gap-2">
              {['Hypertrophy', 'Handbalancing', 'Skills', 'Movements', 'Mobility', 'Calisthenics Strength', 'Lifting', 'Getting Healthier'].map((goal) => (
                <span key={goal} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {goal}
                </span>
              ))}
            </div>
            <p className="mt-4">
              The more specific you can be about your goals, the better. You set the goals you truly want to achieve!
            </p>
          </div>

          {/* Pricing */}
          <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/30 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Investment</h2>
            <div className="text-5xl font-bold text-primary drop-shadow-[0_0_20px_rgba(255,107,53,0.6)] mb-2">
              &euro;450
            </div>
            <p className="text-foreground mb-4">
              3 months of coaching, programming & support
            </p>
            <p className="text-sm text-muted-foreground">
              &euro;150 per month &bull; Payment via PayPal or bank transfer
            </p>
          </div>

          {/* CTA */}
          <div className="text-center pt-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Start?</h3>
            <p className="mb-6 text-muted-foreground">
              Send me an email with your goals and let&apos;s get started!
            </p>
            <a
              href="mailto:littlebeastmtraining@gmail.com?subject=Online Coaching Inquiry"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,107,53,0.6)]"
            >
              <Mail size={20} />
              Contact Me
            </a>
            <p className="mt-4 text-sm text-muted-foreground">
              littlebeastmtraining@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
