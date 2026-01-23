import { put } from '@vercel/blob';
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

const prisma = new PrismaClient();

const pdfMappings = [
  {
    file: 'elite-weighted-dips.pdf',
    slug: '12-week-strength-program',
    newTitle: 'Elite Weighted Dips Program',
  },
  {
    file: 'lbm-blueprint-8.pdf',
    slug: 'athletes-meal-prep-guide',
    newTitle: 'LBM Blueprint 8',
  },
  {
    file: 'LittleBeastMDiet.pdf',
    slug: 'mental-performance-mastery',
    newTitle: 'Little Beast M Diet Guide',
  },
];

async function uploadPdfs() {
  console.log('Starting PDF uploads...\n');

  for (const mapping of pdfMappings) {
    const filePath = path.join(process.cwd(), mapping.file);

    if (!fs.existsSync(filePath)) {
      console.log(`❌ File not found: ${mapping.file}`);
      continue;
    }

    console.log(`Uploading ${mapping.file}...`);

    const fileBuffer = fs.readFileSync(filePath);

    const { url } = await put(`ebooks/${mapping.file}`, fileBuffer, {
      access: 'public',
      contentType: 'application/pdf',
    });

    console.log(`✅ Uploaded to: ${url}`);

    // Update database
    await prisma.ebook.update({
      where: { slug: mapping.slug },
      data: {
        fileUrl: url,
        title: mapping.newTitle,
      },
    });

    console.log(`✅ Updated database for: ${mapping.newTitle}\n`);
  }

  console.log('All done!');
}

uploadPdfs()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
