import { prisma } from '../lib/prisma';
import { sendPurchaseConfirmation } from '../lib/email';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';

const customerEmail = 'littlebeastmtraining@gmail.com';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://littlebeastm.com';

async function main() {
  console.log(`Sending Elite Weighted Dips test email to: ${customerEmail}\n`);

  // Get the Elite Weighted Dips ebook
  const ebook = await prisma.ebook.findUnique({
    where: { slug: 'elite-weighted-dips' },
  });

  if (!ebook) {
    console.error('Elite Weighted Dips ebook not found!');
    return;
  }

  console.log(`Found ebook: ${ebook.title}`);

  // Create a download token
  const downloadToken = uuidv4();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  // Create order and download link
  const order = await prisma.order.create({
    data: {
      email: customerEmail,
      stripeSessionId: `test_weighted_dips_${Date.now()}`,
      status: 'completed',
      amount: 0,
      ebookId: ebook.id,
      downloads: {
        create: {
          token: downloadToken,
          expiresAt,
        },
      },
    },
  });

  console.log(`Created order: ${order.id}`);

  const downloadUrl = `${baseUrl}/download/${downloadToken}`;

  // Send the email with ebookSlug so it includes the Excel files
  await sendPurchaseConfirmation({
    to: customerEmail,
    ebookTitle: ebook.title,
    downloadUrl,
    ebookSlug: ebook.slug,
  });

  console.log(`\nEmail sent to ${customerEmail}!`);
  console.log(`Download URL: ${downloadUrl}`);
  console.log('\nThe email should include:');
  console.log('  - PDF download button');
  console.log('  - 4 Excel spreadsheet links (Phase 1-4)');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
