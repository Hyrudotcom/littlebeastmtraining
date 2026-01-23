import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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

    const existingEbook = await prisma.ebook.findUnique({
      where: { slug },
    });

    if (existingEbook) {
      return NextResponse.json(
        { error: 'An ebook with this slug already exists' },
        { status: 400 }
      );
    }

    const ebook = await prisma.ebook.create({
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
    console.error('Create ebook error:', error);
    return NextResponse.json(
      { error: 'Failed to create ebook' },
      { status: 500 }
    );
  }
}
