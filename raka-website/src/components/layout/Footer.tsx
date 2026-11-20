import React from "react";
import Link from "next/link";
import Image from "next/image";
import { RakaposhiRidgeDivider } from "@/components/icons";

export function Footer() {
  return (
    <footer className="w-full border-t border-raka-sand bg-raka-paper text-raka-ink">
      {/* Signature Rakaposhi Ridge Divider */}
      <RakaposhiRidgeDivider className="pt-4 text-raka-copper" />

      <div className="mx-auto max-w-[1280px] px-5 py-12 tablet:px-8 laptop:px-12 desktop:px-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 laptop:grid-cols-5">
          {/* 1. Brand Narrative */}
          <div className="flex flex-col gap-4 sm:col-span-2 md:col-span-1">
            <Link href="/" aria-label="RAKA home" className="inline-block">
              <Image
                src="/brand/raka-logo.webp"
                alt="RAKA"
                width={72}
                height={72}
                className="h-[72px] w-[72px] object-contain"
              />
            </Link>
            <p className="font-interface text-xs leading-relaxed text-raka-taupe">
              Named after Mount Rakaposhi, Gilgit-Baltistan. Purely powerful hair care, mulberry silk, and hand-carved grooming tools formulated for Pakistani hair, hard water, and regional climate.
            </p>
          </div>

          {/* 2. Shop Categories */}
          <div className="flex flex-col gap-2 font-interface text-[14px]">
            <span className="mb-1 text-[12px] font-bold tracking-[0.14em] uppercase text-raka-taupe">
              Shop Collection
            </span>
            <Link href="/shop" className="text-raka-ink no-underline hover:text-raka-copper-deep transition-colors">
              Hair oils
            </Link>
            <Link href="/shop" className="text-raka-ink no-underline hover:text-raka-copper-deep transition-colors">
              Silk &amp; night
            </Link>
            <Link href="/shop" className="text-raka-ink no-underline hover:text-raka-copper-deep transition-colors">
              Combs &amp; brushes
            </Link>
            <Link href="/shop" className="text-raka-ink no-underline hover:text-raka-copper-deep transition-colors">
              Mani-pedi tools
            </Link>
            <Link href="/shop" className="text-raka-ink no-underline hover:text-raka-copper-deep transition-colors">
              Gift sets &amp; kits
            </Link>
          </div>

          {/* 3. The Ritual & Craft */}
          <div className="flex flex-col gap-2 font-interface text-[14px]">
            <span className="mb-1 text-[12px] font-bold tracking-[0.14em] uppercase text-raka-taupe">
              Craft &amp; Origin
            </span>
            <Link href="/ritual" className="text-raka-ink no-underline hover:text-raka-copper-deep transition-colors">
              The 3-step ritual
            </Link>
            <Link href="/story" className="text-raka-ink no-underline hover:text-raka-copper-deep transition-colors">
              Our story
            </Link>
            <Link href="/craft" className="text-raka-ink no-underline hover:text-raka-copper-deep transition-colors">
              Chiniot neem wood
            </Link>
            <Link href="/craft" className="text-raka-ink no-underline hover:text-raka-copper-deep transition-colors">
              Sialkot stainless steel
            </Link>
            <Link href="/ingredients" className="text-raka-ink no-underline hover:text-raka-copper-deep transition-colors">
              Ingredient transparency
            </Link>
          </div>

          {/* 4. Assurance & Help */}
          <div className="flex flex-col gap-2 font-interface text-[14px]">
            <span className="mb-1 text-[12px] font-bold tracking-[0.14em] uppercase text-raka-taupe">
              Client Care
            </span>
            <Link href="/orders" className="text-raka-ink no-underline hover:text-raka-copper-deep transition-colors">
              Track your order
            </Link>
            <Link href="/delivery" className="text-raka-ink no-underline hover:text-raka-copper-deep transition-colors">
              Delivery across Pakistan
            </Link>
            <Link href="/cod" className="text-raka-ink no-underline hover:text-raka-copper-deep transition-colors">
              Cash on delivery
            </Link>
            <Link href="/returns" className="text-raka-ink no-underline hover:text-raka-copper-deep transition-colors">
              Easy returns
            </Link>
            <Link href="/faq" className="text-raka-ink no-underline hover:text-raka-copper-deep transition-colors">
              FAQs &amp; questions
            </Link>
          </div>

          {/* 5. Contact & WhatsApp */}
          <div className="flex flex-col gap-2 font-interface text-[14px]">
            <span className="mb-1 text-[12px] font-bold tracking-[0.14em] uppercase text-raka-taupe">
              Get in Touch
            </span>
            <a
              href="mailto:info@raka.pk"
              className="text-raka-copper-deep hover:text-raka-ink transition-colors underline underline-offset-4"
            >
              info@raka.pk
            </a>
            <span className="text-raka-ink">WhatsApp: +92 331 7019424</span>
            <span className="text-xs text-raka-taupe mt-1">Lahore, Punjab, Pakistan</span>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-raka-sand pt-6 text-xs text-raka-taupe sm:flex-row font-interface">
          <div>
            &copy; 2026 RAKA. All rights reserved. Made in Pakistan.
          </div>
          <div className="flex items-center gap-6">
            <span className="font-semibold text-raka-ink">PKR (Rs)</span>
            <span>Cash on Delivery</span>
            <span>Free delivery over Rs 4,000</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
