import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const {
      title,
      author,
      description,
      tableOfContents,
      testimonial,
      price,
      slug,
      coverImage,
      fileUrl,
    } = body;

    if (!title || !author || !description || !tableOfContents || !price || !slug || !coverImage || !fileUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const existingEbook = await prisma.ebook.findFirst({
      where: {
        slug,
        NOT: { id },
      },
    });

    if (existingEbook) {
      return NextResponse.json(
        { error: 'An ebook with this slug already exists' },
        { status: 400 }
      );
    }

    const ebook = await prisma.ebook.update({
      where: { id },
      data: {
        title,
        author,
        description,
        tableOfContents,
        testimonial,
        price,
        slug,
        coverImage,
        fileUrl,
      },
    });

    return NextResponse.json(ebook);
  } catch (error) {
    console.error('Update ebook error:', error);
    return NextResponse.json(
      { error: 'Failed to update ebook' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const ebook = await prisma.ebook.findUnique({
      where: { id },
      include: {
        _count: {
          select: { orders: true },
        },
      },
    });

    if (!ebook) {
      return NextResponse.json({ error: 'Ebook not found' }, { status: 404 });
    }

    if (ebook._count.orders > 0) {
      return NextResponse.json(
        { error: 'Cannot delete ebook with existing orders' },
        { status: 400 }
      );
    }

    await prisma.ebook.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete ebook error:', error);
    return NextResponse.json(
      { error: 'Failed to delete ebook' },
      { status: 500 }
    );
  }
}
