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
        "Fuel your performance with this complete nutrition guide designed specifically for athletes. Learn how to meal prep efficiently, optimize your macros for muscle growth and recovery, and never run out of delicious, performance-boosting recipes. Includes 50+ recipes, shopping lists, and meal timing strategies.",
      tableOfContents: `
Chapter 1: Nutrition Fundamentals
- Understanding macronutrients
- Calorie calculations for athletes
- Meal timing for performance

Chapter 2: Meal Prep Mastery
- Kitchen essentials
- Batch cooking techniques
- Storage and portion control

Chapter 3: Recipes
- High-protein breakfasts (10 recipes)
- Power lunches (15 recipes)
- Recovery dinners (15 recipes)
- Healthy snacks (10 recipes)

Chapter 4: Sample Meal Plans
- Bulking phase
- Cutting phase
- Maintenance phase
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
        'Transform your physique with this comprehensive 12-week strength training program. Designed for intermediate to advanced lifters, this program focuses on progressive overload and compound movements to build serious muscle and strength. Includes detailed workout logs, exercise demonstrations, and weekly progression guidelines.',
      tableOfContents: `
Week 1-4: Foundation Phase
- Day 1: Lower Body Power
- Day 2: Upper Body Push
- Day 3: Active Recovery
- Day 4: Lower Body Volume
- Day 5: Upper Body Pull
- Day 6-7: Rest

Week 5-8: Hypertrophy Phase
- Increased volume protocols
- Superset and dropset techniques
- Progressive overload tracking

Week 9-12: Peak Phase
- Strength testing protocols
- Deload strategies
- Competition prep guidelines
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
