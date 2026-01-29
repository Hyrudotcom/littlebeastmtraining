'use client';

import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Training Programs' },
  { href: '/coaching', label: 'Coaching' },
  { href: '/video-library', label: 'Video Library' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-background via-background to-background backdrop-blur-xl">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-transparent to-primary/15 pointer-events-none" />

      {/* Bottom glow line - stronger */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_30px_rgba(255,107,53,1),0_0_60px_rgba(255,107,53,0.6)]" />

      <div className="container mx-auto px-4 py-8 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <Image
              src="/images/lbm-logo.png"
              alt="LBM Training"
              width={80}
              height={80}
              className="rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="hidden sm:block text-xl font-bold tracking-tight uppercase">
              <span className="text-foreground">LBM</span>{' '}
              <span className="text-primary">Training</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-4 sm:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-base md:text-lg font-semibold text-white transition-all duration-300 hover:text-white group"
              >
                {/* Hover background glow */}
                <span className="absolute inset-0 rounded-lg bg-primary/0 group-hover:bg-primary/25 transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(255,107,53,0.5)]" />

                {/* Bottom line indicator - stronger glow */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-primary group-hover:w-3/4 transition-all duration-300 rounded-full shadow-[0_0_20px_rgba(255,107,53,1),0_0_40px_rgba(255,107,53,0.8)]" />

                {/* Text glow on hover */}
                <span className="relative group-hover:drop-shadow-[0_0_15px_rgba(255,107,53,1)]">{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
