import { put } from '@vercel/blob';
import { readFileSync } from 'fs';
import 'dotenv/config';

const files = [
  'Elite-Weighted-Dips-Program-Phase-1-Preparation-Volume-Builder.xlsx',
  'Elite-Weighted-Dips-Program-Phase-2-Speed-Technique.xlsx',
  'Elite-Weighted-Dips-Program-Phase-3-Intensity.xlsx',
  'Elite-Weighted-Dips-Program-Phase-4-Max-Peak.xlsx',
];

async function main() {
  console.log('Uploading Excel files to Vercel Blob...\n');

  for (const filename of files) {
    const filepath = `/Users/vincentvanderstruis/littlebeastmtraining/${filename}`;
    const fileBuffer = readFileSync(filepath);

    const blob = await put(`ebooks/${filename}`, fileBuffer, {
      access: 'public',
      contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    console.log(`Uploaded: ${filename}`);
    console.log(`URL: ${blob.url}\n`);
  }

  console.log('All files uploaded!');
}

main().catch(console.error);
