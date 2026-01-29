import { Resend } from 'resend';
import 'dotenv/config';

const resend = new Resend(process.env.RESEND_API_KEY);

async function main() {
  const testEmail = 'vincentvanderstruis@icloud.com';
  const baseUrl = 'https://littlebeastm.com';

  const ebooks = [
    {
      title: 'THE LBM BLUEPRINT',
      fileUrl: 'https://xsn5iscg5xc7r5w2.public.blob.vercel-storage.com/ebooks/lbm-blueprint-8.pdf',
    },
    {
      title: 'Elite Weighted Dips',
      fileUrl: 'https://xsn5iscg5xc7r5w2.public.blob.vercel-storage.com/ebooks/elite-weighted-dips.pdf',
    },
    {
      title: 'Handstand Press Program',
      fileUrl: 'https://xsn5iscg5xc7r5w2.public.blob.vercel-storage.com/ebooks/Handstand_Press_Program_Fixed.pdf',
    },
    {
      title: 'LBM Nutrition',
      fileUrl: 'https://xsn5iscg5xc7r5w2.public.blob.vercel-storage.com/ebooks/LittleBeastMDiet.pdf',
    },
  ];

  const fromEmail = process.env.EMAIL_FROM || 'noreply@littlebeastm.com';

  const downloadLinksHtml = ebooks
    .map(
      (ebook) => `
        <div style="margin-bottom: 20px; padding: 16px; background-color: #1a1a1a; border-radius: 8px;">
          <p style="color: #ededed; margin: 0 0 12px 0; font-weight: bold;">${ebook.title}</p>
          <a href="${ebook.fileUrl}" style="display: inline-block; background-color: #ff6b35; color: #ffffff; font-weight: bold; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-size: 14px;">
            Download PDF
          </a>
        </div>
      `
    )
    .join('');

  console.log('Sending test email to:', testEmail);
  console.log('Using API key:', process.env.RESEND_API_KEY?.substring(0, 10) + '...');

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
              Click the buttons below to download each ebook.
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

main().catch(console.error);
