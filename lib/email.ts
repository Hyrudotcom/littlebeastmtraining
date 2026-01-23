import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface PurchaseConfirmationParams {
  to: string;
  ebookTitle: string;
  downloadUrl: string;
}

export async function sendPurchaseConfirmation({
  to,
  ebookTitle,
  downloadUrl,
}: PurchaseConfirmationParams) {
  const fromEmail = process.env.EMAIL_FROM || 'noreply@littlebeastmtraining.com';

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
                Click the button below to download your ebook. This link expires in 24 hours and can only be used once.
              </p>

              <a href="${downloadUrl}" style="display: inline-block; background-color: #ff6b35; color: #ffffff; font-weight: bold; padding: 16px 32px; border-radius: 4px; text-decoration: none; font-size: 16px;">
                Download Your Ebook
              </a>

              <p style="color: #888888; font-size: 14px; margin-top: 32px; line-height: 1.6;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <a href="${downloadUrl}" style="color: #ff6b35; word-break: break-all;">${downloadUrl}</a>
              </p>

              <hr style="border: none; border-top: 1px solid #2a2a2a; margin: 32px 0;">

              <p style="color: #888888; font-size: 12px; margin: 0;">
                Need help? Contact us at support@littlebeastmtraining.com
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

interface ResendDownloadLinkParams {
  to: string;
  ebookTitle: string;
  downloadUrl: string;
}

export async function sendDownloadLink({
  to,
  ebookTitle,
  downloadUrl,
}: ResendDownloadLinkParams) {
  const fromEmail = process.env.EMAIL_FROM || 'noreply@littlebeastmtraining.com';

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
                This link expires in 24 hours and can only be used once.
              </p>

              <a href="${downloadUrl}" style="display: inline-block; background-color: #ff6b35; color: #ffffff; font-weight: bold; padding: 16px 32px; border-radius: 4px; text-decoration: none; font-size: 16px;">
                Download Your Ebook
              </a>

              <p style="color: #888888; font-size: 14px; margin-top: 32px; line-height: 1.6;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <a href="${downloadUrl}" style="color: #ff6b35; word-break: break-all;">${downloadUrl}</a>
              </p>

              <hr style="border: none; border-top: 1px solid #2a2a2a; margin: 32px 0;">

              <p style="color: #888888; font-size: 12px; margin: 0;">
                Need help? Contact us at support@littlebeastmtraining.com
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
