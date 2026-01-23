import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EbookForm from '@/components/EbookForm';
import Link from 'next/link';

interface EditEbookPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditEbookPage({ params }: EditEbookPageProps) {
  const { id } = await params;

  const ebook = await prisma.ebook.findUnique({
    where: { id },
  });

  if (!ebook) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/ebooks"
          className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Ebooks
        </Link>
        <h1 className="text-3xl font-bold mt-4">Edit Ebook</h1>
      </div>

      <EbookForm ebook={ebook} />
    </div>
  );
}
