import { prisma } from '../lib/prisma';
import { sendBundleConfirmation } from '../lib/email';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';

const customerEmail = 'jakins573@gmail.com';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://littlebeastm.com';

async function main() {
  console.log(`Resending bundle to: ${customerEmail}\n`);

  // Get all ebooks
  const ebooks = await prisma.ebook.findMany();
  console.log(`Found ${ebooks.length} ebooks in database\n`);

  const downloadData: { title: string; url: string; slug: string }[] = [];

  for (const ebook of ebooks) {
    // Create a new download token for each ebook
    const downloadToken = uuidv4();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    // Check if customer has an existing order for this ebook
    let order = await prisma.order.findFirst({
      where: {
        email: customerEmail,
        ebookId: ebook.id,
      },
    });

    if (!order) {
      // Create order if doesn't exist
      order = await prisma.order.create({
        data: {
          email: customerEmail,
          stripeSessionId: `manual_bundle_${Date.now()}_${ebook.id}`,
          status: 'completed',
          amount: 0, // Bundle was already paid
          ebookId: ebook.id,
        },
      });
      console.log(`Created order for: ${ebook.title}`);
    } else {
      console.log(`Order exists for: ${ebook.title}`);
    }

    // Create new download link
    await prisma.download.create({
      data: {
        token: downloadToken,
        expiresAt,
        orderId: order.id,
      },
    });

    downloadData.push({
      title: ebook.title,
      url: `${baseUrl}/download/${downloadToken}`,
      slug: ebook.slug,
    });

    console.log(`  - Download link created: ${ebook.title}`);
  }

  console.log('\nSending bundle confirmation email...');

  await sendBundleConfirmation({
    to: customerEmail,
    downloadUrls: downloadData,
  });

  console.log(`\nBundle email sent to ${customerEmail}!`);
  console.log('Download links (expire in 7 days):');
  downloadData.forEach(d => console.log(`  - ${d.title}: ${d.url}`));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
