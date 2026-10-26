import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SearchIcon, AccountIcon, BagIcon } from '@/components/icons';
import { Container } from './Container';

export function Header() {
  return (
    <header className="w-full bg-raka-paper border-b border-raka-sand sticky top-0 z-40 shadow-e1">
      <Container className="flex items-center justify-between py-3.5">
        {/* Navigation Links */}
        <nav
          role="navigation"
          aria-label="Main Navigation"
          className="hidden laptop:flex items-center gap-[22px] text-[14px] font-medium text-raka-ink"
        >
          <Link href="/shop" className="no-underline text-raka-ink hover:text-raka-copper-deep transition-colors">
            Shop
          </Link>
          <Link href="/concerns" className="no-underline text-raka-ink hover:text-raka-copper-deep transition-colors">
            Hair concerns
          </Link>
          <Link href="/rituals" className="no-underline text-raka-ink hover:text-raka-copper-deep transition-colors">
            Rituals
          </Link>
          <Link href="/story" className="no-underline text-raka-ink hover:text-raka-copper-deep transition-colors">
            Our story
          </Link>
        </nav>

        {/* Brand Logo in Capsule Silhouette */}
        <div className="flex items-center justify-center">
          <Link href="/" className="inline-block" aria-label="RAKA Home">
            <Image
              src="/brand/raka-logo.webp"
              alt="RAKA"
              width={52}
              height={52}
              className="w-[52px] h-[52px] object-contain"
              priority
            />
          </Link>
        </div>

        {/* Accessible Action Icons (44x44px Touch Targets) */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Search storefront"
            className="w-11 h-11 flex items-center justify-center text-raka-ink hover:text-raka-copper-deep transition-colors rounded-crisp focus-visible:outline-none"
          >
            <SearchIcon size={20} />
          </button>
          <button
            type="button"
            aria-label="User Account"
            className="w-11 h-11 flex items-center justify-center text-raka-ink hover:text-raka-copper-deep transition-colors rounded-crisp focus-visible:outline-none"
          >
            <AccountIcon size={20} />
          </button>
          <button
            type="button"
            aria-label="Shopping bag with items"
            className="w-11 h-11 flex items-center justify-center text-raka-ink hover:text-raka-copper-deep transition-colors rounded-crisp relative focus-visible:outline-none"
          >
            <BagIcon size={20} />
            <span className="absolute top-1.5 right-1 w-4 h-4 rounded-capsule bg-raka-copper text-raka-ink text-[10px] font-bold flex items-center justify-center leading-none">
              1
            </span>
          </button>
        </div>
      </Container>
    </header>
  );
}
