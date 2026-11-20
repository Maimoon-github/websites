"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  SearchIcon,
  AccountIcon,
  WishlistIcon,
  BagIcon,
  HelpIcon,
  MenuIcon,
  CloseIcon,
} from "@/components/icons";

interface HeaderProps {
  bagCount?: number;
}

export function Header({ bagCount = 0 }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navCategories = [
    { label: "Launch edit", href: "/shop", highlight: true },
    { label: "Hair oils", href: "/shop" },
    { label: "Silk & night", href: "/shop" },
    { label: "Combs & brushes", href: "/shop" },
    { label: "Mani-pedi", href: "/shop" },
    { label: "Gift sets", href: "/shop" },
    { label: "The ritual", href: "/ritual" },
    { label: "Our story", href: "/story" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-raka-sand bg-raka-paper/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-3 tablet:px-8 laptop:px-12 desktop:px-20">
        {/* Left: Mobile Menu Toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex h-11 w-11 items-center justify-center rounded-crisp text-raka-ink hover:text-raka-copper-deep focus-visible:outline-2 focus-visible:outline-raka-copper-deep laptop:hidden"
          >
            {mobileMenuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>

          <Link href="/" aria-label="RAKA home" className="flex items-center flex-none">
            <Image
              src="/brand/raka-logo.webp"
              alt="RAKA"
              width={52}
              height={52}
              priority
              className="h-[48px] w-[48px] tablet:h-[52px] tablet:w-[52px] object-contain"
            />
          </Link>
        </div>

        {/* Center: Search input (desktop/tablet) */}
        <div className="hidden flex-1 max-w-md mx-4 tablet:flex items-center">
          <label
            htmlFor="storefront-search"
            className="flex w-full items-center gap-2.5 h-11 px-4 bg-raka-snow border border-raka-sand rounded-capsule focus-within:border-raka-copper-deep focus-within:ring-1 focus-within:ring-raka-copper-deep transition-all"
          >
            <SearchIcon size={18} className="text-raka-taupe flex-none" />
            <span className="sr-only">Search RAKA catalog</span>
            <input
              id="storefront-search"
              type="search"
              placeholder="Search oils, silk, combs, gift sets..."
              className="w-full border-none bg-transparent font-interface text-[14px] text-raka-ink placeholder:text-raka-taupe outline-none"
            />
          </label>
        </div>

        {/* Right: Actions (touch targets >= 44x44px) */}
        <div className="flex items-center gap-1">
          <Link
            href="/help"
            className="hidden laptop:flex items-center gap-1.5 h-11 px-3 text-raka-ink font-interface text-[14px] font-medium hover:text-raka-copper-deep transition-colors"
          >
            <HelpIcon size={18} aria-hidden="true" />
            <span>Help</span>
          </Link>

          <button
            type="button"
            aria-label="Account"
            className="flex h-11 w-11 items-center justify-center rounded-crisp text-raka-ink hover:text-raka-copper-deep transition-colors focus-visible:outline-2 focus-visible:outline-raka-copper-deep"
          >
            <AccountIcon size={20} aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label="Wishlist"
            className="flex h-11 w-11 items-center justify-center rounded-crisp text-raka-ink hover:text-raka-copper-deep transition-colors focus-visible:outline-2 focus-visible:outline-raka-copper-deep"
          >
            <WishlistIcon size={20} aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label={`Shopping bag, ${bagCount} items`}
            className="flex h-11 items-center gap-2 rounded-capsule bg-raka-ink px-3.5 pl-3 text-raka-paper hover:bg-[#2B2420] active:scale-[0.98] transition-all focus-visible:outline-2 focus-visible:outline-raka-copper-deep"
          >
            <BagIcon size={18} aria-hidden="true" />
            <span className="font-interface text-[13px] font-bold">{bagCount}</span>
          </button>
        </div>
      </div>

      {/* Desktop Sub-navigation Categories */}
      <nav
        aria-label="Primary navigation"
        className="hidden laptop:block border-t border-raka-sand/60 bg-raka-paper"
      >
        <div className="mx-auto flex max-w-[1280px] items-center gap-8 px-5 py-2.5 tablet:px-8 laptop:px-12 desktop:px-20 text-[14px] font-interface font-medium">
          {navCategories.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`transition-colors hover:text-raka-copper-deep ${
                item.highlight
                  ? "font-semibold text-raka-copper-deep underline decoration-raka-copper decoration-2 underline-offset-4"
                  : "text-raka-ink no-underline"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-raka-sand bg-raka-paper px-6 py-6 laptop:hidden">
          <div className="mb-4">
            <label
              htmlFor="mobile-search"
              className="flex w-full items-center gap-2.5 h-11 px-4 bg-raka-snow border border-raka-sand rounded-capsule"
            >
              <SearchIcon size={18} className="text-raka-taupe" />
              <input
                id="mobile-search"
                type="search"
                placeholder="Search catalog..."
                className="w-full border-none bg-transparent font-interface text-[14px] text-raka-ink placeholder:text-raka-taupe outline-none"
              />
            </label>
          </div>
          <div className="flex flex-col gap-3 font-interface text-[15px]">
            {navCategories.map((item) => (
              <Link
                key={`mobile-${item.label}`}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-raka-ink hover:text-raka-copper-deep font-medium"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-raka-sand pt-3 flex gap-4 text-sm text-raka-taupe">
              <Link href="/help" onClick={() => setMobileMenuOpen(false)}>
                Help &amp; Support
              </Link>
              <Link href="/orders" onClick={() => setMobileMenuOpen(false)}>
                Track Order
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
