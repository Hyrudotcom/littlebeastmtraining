'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight uppercase">
            <span className="text-foreground">Little Beast</span>{' '}
            <span className="text-primary">M</span>{' '}
            <span className="text-foreground">Training</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
