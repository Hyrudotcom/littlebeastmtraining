import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  try {
    const download = await prisma.download.findUnique({
      where: { token },
      include: {
        order: {
          include: {
            ebook: true,
          },
        },
      },
    });

    if (!download) {
      return NextResponse.redirect(
        new URL('/download/error?reason=invalid', request.url)
      );
    }

    if (download.used) {
      return NextResponse.redirect(
        new URL('/download/error?reason=used', request.url)
      );
    }

    if (new Date() > download.expiresAt) {
      return NextResponse.redirect(
        new URL('/download/error?reason=expired', request.url)
      );
    }

    const ebook = download.order.ebook;

    await prisma.download.update({
      where: { id: download.id },
      data: { used: true },
    });

    if (ebook.fileUrl.startsWith('placeholder://')) {
      const placeholderPdf = generatePlaceholderPdf(ebook.title);

      return new Response(placeholderPdf, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${sanitizeFilename(ebook.title)}.pdf"`,
        },
      });
    }

    try {
      const response = await fetch(ebook.fileUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch file from storage');
      }

      const fileBuffer = await response.arrayBuffer();

      return new NextResponse(fileBuffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${sanitizeFilename(ebook.title)}.pdf"`,
        },
      });
    } catch (error) {
      console.error('Error fetching file from storage:', error);
      return NextResponse.redirect(
        new URL('/download/error?reason=file', request.url)
      );
    }
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.redirect(
      new URL('/download/error?reason=error', request.url)
    );
  }
}

function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9-_. ]/g, '').replace(/\s+/g, '-');
}

function generatePlaceholderPdf(title: string): string {
  return `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 200 >>
stream
BT
/F1 24 Tf
50 700 Td
(${title}) Tj
0 -40 Td
/F1 14 Tf
(This is a placeholder PDF.) Tj
0 -30 Td
(The actual ebook content would be here.) Tj
0 -30 Td
(Thank you for your purchase!) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000266 00000 n
0000000518 00000 n
trailer
<< /Size 6 /Root 1 0 R >>
startxref
595
%%EOF`;
}
