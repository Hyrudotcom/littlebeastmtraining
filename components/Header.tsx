'use client';

import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { href: '/coaching', label: 'Coaching' },
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
            className="group flex items-center gap-4 text-2xl font-bold tracking-tight uppercase"
          >
            <div className="relative">
              {/* Logo glow effect on hover */}
              <div className="absolute -inset-3 bg-primary/0 group-hover:bg-primary/50 rounded-xl blur-2xl transition-all duration-500" />
              <Image
                src="/logo.svg"
                alt="LBM Logo"
                width={48}
                height={48}
                className="relative rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              />
            </div>
            <span className="hidden sm:block">
              <span className="text-foreground transition-colors duration-300 group-hover:text-white">Little Beast</span>{' '}
              <span className="text-primary transition-all duration-300 drop-shadow-[0_0_12px_rgba(255,107,53,0.7)] group-hover:drop-shadow-[0_0_25px_rgba(255,107,53,1)]">M</span>{' '}
              <span className="text-foreground transition-colors duration-300 group-hover:text-white">Training</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-4 sm:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-5 py-3 text-lg font-semibold text-white transition-all duration-300 hover:text-white group"
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
