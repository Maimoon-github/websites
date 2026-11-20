import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RakaposhiRidgeDivider } from '@/components/icons';

export function Footer() {
  return (
    <footer className="w-full bg-raka-paper border-t border-raka-sand">
      <div className="max-w-[1360px] mx-auto px-6 pt-14 pb-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 laptop:grid-cols-5 gap-8">
        {/* Brand Column */}
        <div className="flex flex-col gap-3">
          <Link href="/" aria-label="RAKA home" className="inline-block">
            <Image
              src="/brand/raka-logo.webp"
              alt="RAKA, Purely Powerful"
              width={92}
              height={92}
              className="w-[92px] h-[92px] object-contain"
            />
          </Link>
          <span className="text-[13px] leading-[1.55] text-raka-taupe">
            Premium hair care, silk and grooming tools, made in Pakistan.
          </span>
        </div>

        {/* Shop Column */}
        <div className="flex flex-col gap-1.5 text-[14px]">
          <span className="text-[12px] font-bold tracking-[0.14em] uppercase text-raka-taupe mb-1.5">
            Shop
          </span>
          <Link href="/shop" className="text-raka-ink no-underline py-1 hover:text-raka-copper-deep transition-colors">
            Hair oils
          </Link>
          <Link href="/shop" className="text-raka-ink no-underline py-1 hover:text-raka-copper-deep transition-colors">
            Silk &amp; night
          </Link>
          <Link href="/shop" className="text-raka-ink no-underline py-1 hover:text-raka-copper-deep transition-colors">
            Combs &amp; brushes
          </Link>
          <Link href="/shop" className="text-raka-ink no-underline py-1 hover:text-raka-copper-deep transition-colors">
            Mani-pedi
          </Link>
          <Link href="#sets" className="text-raka-ink no-underline py-1 hover:text-raka-copper-deep transition-colors">
            Gift sets
          </Link>
        </div>

        {/* Help Column */}
        <div className="flex flex-col gap-1.5 text-[14px]">
          <span className="text-[12px] font-bold tracking-[0.14em] uppercase text-raka-taupe mb-1.5">
            Help
          </span>
          <Link href="/orders" className="text-raka-ink no-underline py-1 hover:text-raka-copper-deep transition-colors">
            Track your order
          </Link>
          <Link href="/delivery" className="text-raka-ink no-underline py-1 hover:text-raka-copper-deep transition-colors">
            Delivery
          </Link>
          <Link href="/returns" className="text-raka-ink no-underline py-1 hover:text-raka-copper-deep transition-colors">
            Returns
          </Link>
          <Link href="/faq" className="text-raka-ink no-underline py-1 hover:text-raka-copper-deep transition-colors">
            FAQ
          </Link>
        </div>

        {/* RAKA Column */}
        <div className="flex flex-col gap-1.5 text-[14px]">
          <span className="text-[12px] font-bold tracking-[0.14em] uppercase text-raka-taupe mb-1.5">
            RAKA
          </span>
          <Link href="/story" className="text-raka-ink no-underline py-1 hover:text-raka-copper-deep transition-colors">
            Our story
          </Link>
          <Link href="#journal" className="text-raka-ink no-underline py-1 hover:text-raka-copper-deep transition-colors">
            Journal
          </Link>
          <Link href="/corporate-gifting" className="text-raka-ink no-underline py-1 hover:text-raka-copper-deep transition-colors">
            Corporate gifting
          </Link>
        </div>

        {/* Contact Column */}
        <div className="flex flex-col gap-1.5 text-[14px]">
          <span className="text-[12px] font-bold tracking-[0.14em] uppercase text-raka-taupe mb-1.5">
            Contact
          </span>
          <a
            href="mailto:info@raka.pk"
            className="text-raka-copper-deep hover:text-raka-ink transition-colors py-1 underline"
          >
            info@raka.pk
          </a>
          <span className="text-raka-ink py-1">WhatsApp 0331 7019424</span>
        </div>
      </div>

      {/* Signature Rakaposhi Ridge outline divider */}
      <RakaposhiRidgeDivider className="py-2" />

      {/* Bottom Legal & Payment Row */}
      <div className="max-w-[1360px] mx-auto px-6 py-4 border-t border-raka-sand flex flex-wrap gap-3 justify-between items-center text-[12px] text-raka-taupe">
        <span>© 2026 RAKA. Purely Powerful.</span>

        <div className="flex gap-2 flex-wrap" aria-label="Accepted payment methods">
          <span className="px-2 py-1 border border-raka-sand rounded-crisp bg-raka-paper text-raka-ink font-semibold">
            COD
          </span>
          <span className="px-2 py-1 border border-raka-sand rounded-crisp bg-raka-paper text-raka-ink font-semibold">
            Visa
          </span>
          <span className="px-2 py-1 border border-raka-sand rounded-crisp bg-raka-paper text-raka-ink font-semibold">
            Mastercard
          </span>
          <span className="px-2 py-1 border border-raka-sand rounded-crisp bg-raka-paper text-raka-ink font-semibold">
            JazzCash
          </span>
          <span className="px-2 py-1 border border-raka-sand rounded-crisp bg-raka-paper text-raka-ink font-semibold">
            Easypaisa
          </span>
        </div>

        <div className="flex gap-4">
          <Link href="/privacy" className="text-raka-taupe hover:text-raka-ink transition-colors no-underline">
            Privacy policy
          </Link>
          <Link href="/terms" className="text-raka-taupe hover:text-raka-ink transition-colors no-underline">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
