import { put } from '@vercel/blob';
import { readFileSync } from 'fs';
import { prisma } from '../lib/prisma';
import 'dotenv/config';

const thumbnails = [
  {
    filePath: '/Users/vincentvanderstruis/littlebeastmtraining/lbmblueprintthumbnailimage.png',
    blobName: 'thumbnails/lbm-blueprint.png',
    ebookSlug: 'the-lbm-blueprint',
  },
  {
    filePath: '/Users/vincentvanderstruis/littlebeastmtraining/elite weighted dips thumnail.png',
    blobName: 'thumbnails/elite-weighted-dips.png',
    ebookSlug: 'elite-weighted-dips',
  },
];

async function main() {
  console.log('Uploading new thumbnails to Vercel Blob...\n');

  for (const thumbnail of thumbnails) {
    const fileBuffer = readFileSync(thumbnail.filePath);

    const blob = await put(thumbnail.blobName, fileBuffer, {
      access: 'public',
      contentType: 'image/png',
    });

    console.log(`Uploaded: ${thumbnail.blobName}`);
    console.log(`URL: ${blob.url}`);

    // Update the ebook in the database
    const updated = await prisma.ebook.update({
      where: { slug: thumbnail.ebookSlug },
      data: { coverImage: blob.url },
    });

    console.log(`Updated ebook: ${updated.title}\n`);
  }

  console.log('All thumbnails uploaded and database updated!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
