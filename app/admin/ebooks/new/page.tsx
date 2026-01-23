import EbookForm from '@/components/EbookForm';
import Link from 'next/link';

export default function NewEbookPage() {
  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/ebooks"
          className="text-[var(--muted)] hover:text-[var(--foreground)] text-sm flex items-center gap-2"
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
        <h1 className="text-3xl font-bold mt-4">Add New Ebook</h1>
      </div>

      <EbookForm />
    </div>
  );
}
