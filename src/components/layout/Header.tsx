'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SearchIcon, AccountIcon, WishlistIcon, BagIcon, HelpIcon } from '@/components/icons';
import { useCart } from '@/lib/cart-context';

export function Header() {
  const { bagCount } = useCart();

  const navCategories = [
    { label: 'Launch edit', href: '/shop', highlight: true },
    { label: 'Hair oils', href: '/shop' },
    { label: 'Silk & night', href: '/shop' },
    { label: 'Combs & brushes', href: '/shop' },
    { label: 'Mani-pedi', href: '/shop' },
    { label: 'Brow & face', href: '/shop' },
    { label: 'Bath & spa', href: '/shop' },
    { label: 'Men', href: '/shop' },
    { label: 'Gift sets', href: '#sets' },
    { label: 'Hair concerns', href: '#concerns' },
    { label: 'Journal', href: '#journal' },
  ];

  return (
    <header className="bg-raka-paper border-b border-raka-sand sticky top-0 z-40">
      <div className="max-w-[1360px] mx-auto px-6 py-2.5 flex items-center gap-4 flex-wrap">
        {/* Brand Logo in Capsule Emblem */}
        <Link href="/" aria-label="RAKA home" className="flex items-center flex-none">
          <Image
            src="/brand/raka-logo.webp"
            alt="RAKA"
            width={60}
            height={60}
            className="w-[60px] h-[60px] object-contain"
            priority
          />
        </Link>

        {/* Storefront Search Bar */}
        <label
          htmlFor="storefront-search"
          className="flex-1 basis-[320px] flex items-center gap-2.5 h-[46px] px-4 bg-raka-snow border border-raka-sand rounded-capsule min-w-0 focus-within:border-raka-copper-deep focus-within:ring-1 focus-within:ring-raka-copper-deep transition-all"
        >
          <SearchIcon size={18} className="text-raka-taupe flex-none" />
          <span className="sr-only">Search RAKA</span>
          <input
            id="storefront-search"
            type="search"
            placeholder="Search oils, silk, combs, mani-pedi sets..."
            className="flex-1 min-w-0 border-none bg-transparent font-interface text-[15px] text-raka-ink placeholder:text-raka-taupe outline-none"
          />
        </label>

        {/* Action Controls (All touch targets >= 44x44px) */}
        <div className="flex items-center gap-0.5 flex-none">
          <Link
            href="/help"
            className="flex items-center gap-2 h-11 px-3 text-raka-ink no-underline text-[14px] font-semibold hover:text-raka-copper-deep transition-colors"
          >
            <HelpIcon size={20} aria-hidden="true" />
            <span>Help</span>
          </Link>

          <button
            type="button"
            aria-label="Account"
            className="w-11 h-11 border-none bg-transparent text-raka-ink flex items-center justify-center hover:text-raka-copper-deep transition-colors focus-visible:outline-none"
          >
            <AccountIcon size={21} aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label="Wishlist"
            className="w-11 h-11 border-none bg-transparent text-raka-ink flex items-center justify-center hover:text-raka-copper-deep transition-colors focus-visible:outline-none"
          >
            <WishlistIcon size={21} aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label={`Bag, ${bagCount} items`}
            className="h-11 px-3.5 pl-3 border-none rounded-capsule bg-raka-ink text-raka-paper flex items-center gap-2 font-interface text-[14px] font-bold hover:bg-[#2B2420] active:scale-[0.98] transition-all focus-visible:outline-none"
          >
            <BagIcon size={19} aria-hidden="true" />
            <span>{bagCount}</span>
          </button>
        </div>
      </div>

      {/* Sub-navigation categories */}
      <nav
        aria-label="Shop categories"
        className="rk-scroll border-t border-[#F0E8DE] overflow-x-auto"
      >
        <div className="max-w-[1360px] mx-auto px-6 flex gap-[26px] whitespace-nowrap text-[14px] font-semibold">
          {navCategories.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`py-[13px] no-underline transition-colors ${
                item.highlight
                  ? 'text-raka-ember hover:text-raka-ink'
                  : 'text-raka-ink hover:text-raka-copper-deep'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
