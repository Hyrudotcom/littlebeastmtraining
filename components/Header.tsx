'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-[var(--card-border)] bg-[var(--background)]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight uppercase">
            <span className="text-[var(--foreground)]">Little Beast</span>{' '}
            <span className="text-[var(--accent)]">M</span>{' '}
            <span className="text-[var(--foreground)]">Training</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
