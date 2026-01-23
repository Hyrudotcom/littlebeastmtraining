'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DownloadRequestPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/download/resend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to request download link');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-lg text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-6">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold mb-4">Check Your Email</h1>
        <p className="text-[var(--muted)] mb-8">
          If we found any purchases associated with <strong>{email}</strong>, we've sent new download links to that address.
        </p>

        <Link
          href="/"
          className="inline-block bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold py-3 px-6 rounded transition-colors"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Request Download Link</h1>
        <p className="text-[var(--muted)]">
          Enter the email address you used for your purchase and we'll send you a new download link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-[var(--card-bg)] border border-[var(--card-border)] rounded focus:outline-none focus:border-[var(--accent)] transition-colors"
            placeholder="your@email.com"
          />
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded transition-colors"
        >
          {loading ? 'Sending...' : 'Send Download Link'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          Back to Store
        </Link>
      </div>
    </div>
  );
}
