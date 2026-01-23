'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-bold text-[var(--accent)] mb-4">500</h1>
      <h2 className="text-2xl font-bold mb-4">Something Went Wrong</h2>
      <p className="text-[var(--muted)] mb-8 max-w-md mx-auto">
        An unexpected error occurred. Please try again.
      </p>
      <div className="flex gap-4 justify-center">
        <button
          onClick={reset}
          className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold py-3 px-6 rounded transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="border border-[var(--card-border)] hover:border-[var(--accent)] text-[var(--foreground)] font-bold py-3 px-6 rounded transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
