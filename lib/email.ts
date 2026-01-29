import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Excel files for Elite Weighted Dips program
const WEIGHTED_DIPS_EXCEL_FILES = [
  {
    name: 'Phase 1: Preparation & Volume Builder',
    url: 'https://xsn5iscg5xc7r5w2.public.blob.vercel-storage.com/ebooks/Elite-Weighted-Dips-Program-Phase-1-Preparation-Volume-Builder.xlsx',
  },
  {
    name: 'Phase 2: Speed & Technique',
    url: 'https://xsn5iscg5xc7r5w2.public.blob.vercel-storage.com/ebooks/Elite-Weighted-Dips-Program-Phase-2-Speed-Technique.xlsx',
  },
  {
    name: 'Phase 3: Intensity',
    url: 'https://xsn5iscg5xc7r5w2.public.blob.vercel-storage.com/ebooks/Elite-Weighted-Dips-Program-Phase-3-Intensity.xlsx',
  },
  {
    name: 'Phase 4: Max Peak',
    url: 'https://xsn5iscg5xc7r5w2.public.blob.vercel-storage.com/ebooks/Elite-Weighted-Dips-Program-Phase-4-Max-Peak.xlsx',
  },
];

interface PurchaseConfirmationParams {
  to: string;
  ebookTitle: string;
  downloadUrl: string;
  ebookSlug?: string;
}

export async function sendPurchaseConfirmation({
  to,
  ebookTitle,
  downloadUrl,
  ebookSlug,
}: PurchaseConfirmationParams) {
  const fromEmail = process.env.EMAIL_FROM || 'noreply@littlebeastm.com';

  // Check if this is the weighted dips program
  const isWeightedDips = ebookSlug === 'elite-weighted-dips' || ebookTitle.toLowerCase().includes('weighted dips');

  let extraFilesHtml = '';
  if (isWeightedDips) {
    extraFilesHtml = `
      <div style="margin-top: 32px; padding: 24px; background-color: #1a1a1a; border-radius: 8px;">
        <h2 style="color: #ff6b35; margin: 0 0 16px 0; font-size: 18px;">Bonus: Training Spreadsheets</h2>
        <p style="color: #888888; margin-bottom: 16px; font-size: 14px;">Download your Excel tracking sheets for each phase:</p>
        ${WEIGHTED_DIPS_EXCEL_FILES.map(file => `
          <div style="margin-bottom: 12px;">
            <a href="${file.url}" style="color: #ff6b35; text-decoration: none; font-weight: bold;">${file.name}</a>
            <span style="color: #666; font-size: 12px;"> (.xlsx)</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `Little Beast M Training <${fromEmail}>`,
      to,
      subject: `Your Download: ${ebookTitle}`,
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
                You've purchased <strong>${ebookTitle}</strong>.
              </p>

              <p style="color: #888888; line-height: 1.6; margin-bottom: 24px;">
                Click the button below to download your ebook. This link expires in 24 hours.
              </p>

              <a href="${downloadUrl}" style="display: inline-block; background-color: #ff6b35; color: #ffffff; font-weight: bold; padding: 16px 32px; border-radius: 4px; text-decoration: none; font-size: 16px;">
                Download Your Ebook
              </a>

              <p style="color: #888888; font-size: 14px; margin-top: 32px; line-height: 1.6;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <a href="${downloadUrl}" style="color: #ff6b35; word-break: break-all;">${downloadUrl}</a>
              </p>

              ${extraFilesHtml}

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
      console.error('Error sending purchase confirmation:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to send purchase confirmation:', error);
    throw error;
  }
}

interface SendBundleConfirmationParams {
  to: string;
  downloadUrls: { title: string; url: string; slug?: string }[];
}

export async function sendBundleConfirmation({
  to,
  downloadUrls,
}: SendBundleConfirmationParams) {
  const fromEmail = process.env.EMAIL_FROM || 'noreply@littlebeastm.com';

  const downloadLinksHtml = downloadUrls
    .map(({ title, url, slug }) => {
      // Check if this is weighted dips to add excel files
      const isWeightedDips = slug === 'elite-weighted-dips' || title.toLowerCase().includes('weighted dips');

      let excelLinks = '';
      if (isWeightedDips) {
        excelLinks = `
          <div style="margin-top: 8px; padding-left: 16px;">
            <p style="color: #888; font-size: 12px; margin: 4px 0;">Training Spreadsheets:</p>
            ${WEIGHTED_DIPS_EXCEL_FILES.map(file => `
              <a href="${file.url}" style="color: #ff6b35; text-decoration: none; font-size: 12px; display: block; margin: 2px 0;">${file.name}</a>
            `).join('')}
          </div>
        `;
      }

      return `
        <div style="margin-bottom: 20px; padding: 16px; background-color: #1a1a1a; border-radius: 8px;">
          <p style="color: #ededed; margin: 0 0 12px 0; font-weight: bold;">${title}</p>
          <a href="${url}" style="display: inline-block; background-color: #ff6b35; color: #ffffff; font-weight: bold; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-size: 14px;">
            Download PDF
          </a>
          ${excelLinks}
        </div>
      `;
    })
    .join('');

  try {
    const { data, error } = await resend.emails.send({
      from: `Little Beast M Training <${fromEmail}>`,
      to,
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
                Click the buttons below to download each ebook. Links expire in 24 hours.
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
      console.error('Error sending bundle confirmation:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to send bundle confirmation:', error);
    throw error;
  }
}

interface ResendDownloadLinkParams {
  to: string;
  ebookTitle: string;
  downloadUrl: string;
  ebookSlug?: string;
}

export async function sendDownloadLink({
  to,
  ebookTitle,
  downloadUrl,
  ebookSlug,
}: ResendDownloadLinkParams) {
  const fromEmail = process.env.EMAIL_FROM || 'noreply@littlebeastm.com';

  // Check if this is the weighted dips program
  const isWeightedDips = ebookSlug === 'elite-weighted-dips' || ebookTitle.toLowerCase().includes('weighted dips');

  let extraFilesHtml = '';
  if (isWeightedDips) {
    extraFilesHtml = `
      <div style="margin-top: 32px; padding: 24px; background-color: #1a1a1a; border-radius: 8px;">
        <h2 style="color: #ff6b35; margin: 0 0 16px 0; font-size: 18px;">Bonus: Training Spreadsheets</h2>
        <p style="color: #888888; margin-bottom: 16px; font-size: 14px;">Download your Excel tracking sheets for each phase:</p>
        ${WEIGHTED_DIPS_EXCEL_FILES.map(file => `
          <div style="margin-bottom: 12px;">
            <a href="${file.url}" style="color: #ff6b35; text-decoration: none; font-weight: bold;">${file.name}</a>
            <span style="color: #666; font-size: 12px;"> (.xlsx)</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `Little Beast M Training <${fromEmail}>`,
      to,
      subject: `New Download Link: ${ebookTitle}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; background-color: #0a0a0a; color: #ededed; padding: 40px 20px; margin: 0;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #141414; border-radius: 8px; padding: 40px; border: 1px solid #2a2a2a;">
              <h1 style="color: #ff6b35; margin-bottom: 24px; font-size: 24px;">Your New Download Link</h1>

              <p style="color: #ededed; line-height: 1.6; margin-bottom: 16px;">
                Here's a new download link for <strong>${ebookTitle}</strong>.
              </p>

              <p style="color: #888888; line-height: 1.6; margin-bottom: 24px;">
                This link expires in 24 hours.
              </p>

              <a href="${downloadUrl}" style="display: inline-block; background-color: #ff6b35; color: #ffffff; font-weight: bold; padding: 16px 32px; border-radius: 4px; text-decoration: none; font-size: 16px;">
                Download Your Ebook
              </a>

              <p style="color: #888888; font-size: 14px; margin-top: 32px; line-height: 1.6;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <a href="${downloadUrl}" style="color: #ff6b35; word-break: break-all;">${downloadUrl}</a>
              </p>

              ${extraFilesHtml}

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
      console.error('Error sending download link:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to send download link:', error);
    throw error;
  }
}
