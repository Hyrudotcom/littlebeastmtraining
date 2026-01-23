import Link from 'next/link';

interface ErrorPageProps {
  searchParams: Promise<{ reason?: string }>;
}

const errorMessages: Record<string, { title: string; message: string }> = {
  invalid: {
    title: 'Invalid Download Link',
    message: 'This download link is not valid. Please check your email for the correct link.',
  },
  used: {
    title: 'Link Already Used',
    message: 'This download link has already been used. Each link can only be used once.',
  },
  expired: {
    title: 'Link Expired',
    message: 'This download link has expired. Download links are valid for 24 hours.',
  },
  file: {
    title: 'File Not Available',
    message: 'The file could not be retrieved. Please try again later or contact support.',
  },
  error: {
    title: 'Something Went Wrong',
    message: 'An unexpected error occurred. Please try again or contact support.',
  },
};

export default async function DownloadErrorPage({ searchParams }: ErrorPageProps) {
  const params = await searchParams;
  const reason = params.reason || 'error';
  const error = errorMessages[reason] || errorMessages.error;

  return (
    <div className="container mx-auto px-4 py-12 max-w-lg text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-6">
        <svg
          className="w-8 h-8 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>

      <h1 className="text-3xl font-bold mb-4">{error.title}</h1>
      <p className="text-[var(--muted)] mb-8">{error.message}</p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/download/request"
          className="inline-block bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold py-3 px-6 rounded transition-colors"
        >
          Request New Link
        </Link>
        <Link
          href="/"
          className="inline-block border border-[var(--card-border)] hover:border-[var(--accent)] text-[var(--foreground)] font-bold py-3 px-6 rounded transition-colors"
        >
          Return to Store
        </Link>
      </div>
    </div>
  );
}
