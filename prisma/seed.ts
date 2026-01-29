import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import * as bcrypt from 'bcryptjs';
import 'dotenv/config';

function createPrismaClient() {
  if (process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN) {
    const adapter = new PrismaLibSql({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    return new PrismaClient({ adapter });
  }
  return new PrismaClient();
}

const prisma = createPrismaClient();

async function main() {
  // Create demo ebooks
  const ebooks = [
    {
      title: 'THE LBM BLUEPRINT',
      author: 'Little Beast M',
      description:
        "In this book you will learn how to build a well rounded body and mind, by using different styles of training and tools. With this program you will learn how to combine both Calisthenics and Weight training together to build a bulletproof body.",
      tableOfContents: `
THE LBM BLUEPRINT – 3 MONTH PROGRAM – VERSION 1

What's Inside:
• Calisthenics Training
• Ring Training
• Barbell and Dumbbell Training
• Joint Prep
• Loaded Stretching
• Dynamic Stretching
• Mobility Flow
• Breathing Techniques
• Meditation
• And more!

Build a well-rounded body and mind using different styles of training and tools.
      `.trim(),
      testimonial:
        "Finally, a nutrition guide that makes sense for athletes. The recipes are simple and delicious! - Sarah M.",
      price: 3000,
      coverImage: '/images/lbm-blueprint.png',
      fileUrl: 'https://xsn5iscg5xc7r5w2.public.blob.vercel-storage.com/ebooks/lbm-blueprint-8.pdf',
      slug: 'the-lbm-blueprint',
    },
    {
      title: 'Elite Weighted Dips',
      author: 'Little Beast M',
      description:
        'The Elite Weighted Dips program is specifically designed to help you build strength and achieve new personal records in weighted dips. LittleBeastM was one of the pioneers of bringing heavy dips to the calisthenics world - he raised the bar and showed the training community what\'s possible. Train with LittleBeastM to achieve insane feats of dip strength!',
      tableOfContents: `
ELITE WEIGHTED DIPS – 4 MONTH PROGRAM

A program highly specific to increasing performance in weighted dips.

4 Distinct Training Phases:
• Phase 1: Muscle Building
• Phase 2: Building Speed
• Phase 3: Volume Training
• Phase 4: Intensity Peak

What's Included:
• 3 pushing days per week (easy to incorporate into existing routine)
• In-depth knowledge and training methods
• Detailed warm-up routines
• Shoulder health exercises
• Every exercise demonstrated and explained via video

After completing all 4 phases and setting new records, you can repeat this incredible program!
      `.trim(),
      testimonial:
        "This program completely changed my approach to training. Gained 15lbs of muscle in 12 weeks! - Jake R.",
      price: 3000,
      coverImage: '/images/elite-weighted-dips.png',
      fileUrl: 'https://xsn5iscg5xc7r5w2.public.blob.vercel-storage.com/ebooks/elite-weighted-dips.pdf',
      slug: 'elite-weighted-dips',
    },
    {
      title: 'LBM Nutrition',
      author: 'Little Beast M',
      description:
        "Unlock your mental edge with proven sports psychology techniques. This guide covers visualization, focus training, pre-competition routines, and overcoming mental barriers. Whether you're an athlete, entrepreneur, or anyone looking to perform at their best, this book will give you the mental tools for success.",
      tableOfContents: `
Part 1: The Champion Mindset
- Fixed vs. growth mindset
- Building mental resilience
- The psychology of peak performance

Part 2: Visualization Techniques
- Creating vivid mental imagery
- Competition day visualization
- Recovery visualization

Part 3: Focus & Concentration
- Eliminating distractions
- Flow state mastery
- Pre-performance routines

Part 4: Overcoming Obstacles
- Managing competition anxiety
- Bouncing back from setbacks
- Dealing with pressure
      `.trim(),
      testimonial:
        "This book helped me overcome my competition anxiety. Now I perform better under pressure than ever. - Mike T.",
      price: 600,
      coverImage: '/images/lbm-diet.png',
      fileUrl: 'https://xsn5iscg5xc7r5w2.public.blob.vercel-storage.com/ebooks/LittleBeastMDiet.pdf',
      slug: 'lbm-nutrition',
    },
    {
      title: 'Handstand Press Program',
      author: 'Little Beast M',
      description:
        'The Handstand Press e-book is for those who want to learn and progress towards mastering the straight arm handstand press. A perfect program for those who already can hold a nice freestanding handstand and want to explore more on hands. If a heavyweight like LittleBeastM can do a handstand press, then so can you! Learn with LittleBeastM\'s unique programming and training style!',
      tableOfContents: `
HANDSTAND PRESS PROGRAM – 3 TRAINING PHASES

Each phase gets progressively harder with the right volume and intensity.

What's Included:
• 3 progressive training phases
• Upper body and lower body mobility work (same day, same workout)
• Warm ups, preparations, activations, and joint health
• Different schedule options
• Every exercise recorded on video and explained

Focus Areas:
• Handstand strength
• Core strength
• Shoulder strength
• Straight arm strength
• Mobility for smoother presses

LittleBeastM's smart programming combines strength and mobility training for optimal progress.
      `.trim(),
      testimonial: null,
      price: 2000,
      coverImage: '/images/hs-press.png',
      fileUrl: 'https://xsn5iscg5xc7r5w2.public.blob.vercel-storage.com/ebooks/Handstand_Press_Program_Fixed.pdf',
      slug: 'handstand-press-program',
    },
  ];

  for (const ebook of ebooks) {
    await prisma.ebook.upsert({
      where: { slug: ebook.slug },
      update: ebook,
      create: ebook,
    });
  }

  console.log('Created demo ebooks');

  // Create default admin user
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.admin.upsert({
    where: { email: 'admin@littlebeastmtraining.com' },
    update: {},
    create: {
      email: 'admin@littlebeastmtraining.com',
      name: 'Admin',
      passwordHash,
    },
  });

  console.log('Created default admin user');
  console.log('Email: admin@littlebeastmtraining.com');
  console.log('Password: admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
