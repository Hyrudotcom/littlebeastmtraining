import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { Resend } from 'resend';
import { v4 as uuidv4 } from 'uuid';
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
const resend = new Resend(process.env.RESEND_API_KEY);

async function main() {
  const testEmail = 'vincentvanderstruis@icloud.com';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://littlebeastm.com';

  console.log('Fetching all ebooks...');

  // Get all 4 ebooks
  const ebooks = await prisma.ebook.findMany({
    where: {
      slug: {
        in: ['the-lbm-blueprint', 'elite-weighted-dips', 'handstand-press-program', 'lbm-nutrition']
      }
    }
  });

  console.log(`Found ${ebooks.length} ebooks`);

  const downloadLinks: { title: string; url: string }[] = [];

  for (const ebook of ebooks) {
    // Create download token
    const downloadToken = uuidv4();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    // Create test order with download
    await prisma.order.create({
      data: {
        email: testEmail,
        stripeSessionId: `test_bundle_${Date.now()}_${ebook.id}`,
        status: 'completed',
        amount: ebook.price,
        ebookId: ebook.id,
        downloads: {
          create: {
            token: downloadToken,
            expiresAt,
          },
        },
      },
    });

    downloadLinks.push({
      title: ebook.title,
      url: `${baseUrl}/download/${downloadToken}`,
    });

    console.log(`Created download link for: ${ebook.title}`);
  }

  // Send email with all download links
  const fromEmail = process.env.EMAIL_FROM || 'noreply@littlebeastm.com';

  const downloadLinksHtml = downloadLinks
    .map(
      (link) => `
        <div style="margin-bottom: 20px; padding: 16px; background-color: #1a1a1a; border-radius: 8px;">
          <p style="color: #ededed; margin: 0 0 12px 0; font-weight: bold;">${link.title}</p>
          <a href="${link.url}" style="display: inline-block; background-color: #ff6b35; color: #ffffff; font-weight: bold; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-size: 14px;">
            Download
          </a>
        </div>
      `
    )
    .join('');

  console.log('Sending email...');

  const { data, error } = await resend.emails.send({
    from: `Little Beast M Training <${fromEmail}>`,
    to: testEmail,
    subject: 'Your Complete LBM Bundle - All Downloads',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #0a0a0a; color: #ededed; padding: 40px 20px; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #141414; border-radius: 8px; padding: 40px; border: 1px solid #2a2a2a;">
            <h1 style="color: #ff6b35; margin-bottom: 24px; font-size: 24px;">Thank You for Your Purchase!</h1>

            <p style="color: #ededed; line-height: 1.6; margin-bottom: 16px;">
              You've purchased the <strong>Complete LBM Bundle</strong> - all 4 training programs!
            </p>

            <p style="color: #888888; line-height: 1.6; margin-bottom: 24px;">
              Click the buttons below to download each ebook. These links expire in 7 days.
            </p>

            ${downloadLinksHtml}

            <hr style="border: none; border-top: 1px solid #2a2a2a; margin: 32px 0;">

            <p style="color: #888888; font-size: 12px; margin: 0;">
              Need help? Contact us at littlebeastmtraining@gmail.com
            </p>
          </div>
        </body>
      </html>
    `,
  });

  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent successfully!');
    console.log('Email ID:', data?.id);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
