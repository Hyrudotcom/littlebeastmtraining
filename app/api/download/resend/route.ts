import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import { sendDownloadLink } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const orders = await prisma.order.findMany({
      where: {
        email: email.toLowerCase(),
        status: 'completed',
      },
      include: {
        ebook: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (orders.length === 0) {
      return NextResponse.json({ success: true });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    for (const order of orders) {
      const downloadToken = uuidv4();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

      await prisma.download.create({
        data: {
          token: downloadToken,
          expiresAt,
          orderId: order.id,
        },
      });

      const downloadUrl = `${baseUrl}/download/${downloadToken}`;

      try {
        await sendDownloadLink({
          to: email,
          ebookTitle: order.ebook.title,
          downloadUrl,
        });
      } catch (emailError) {
        console.error('Failed to send email for order:', order.id, emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Resend download link error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
