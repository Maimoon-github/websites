import React from 'react';
import Link from 'next/link';
import { Container } from './Container';
import { DeliveryIcon, CashOnDeliveryIcon, MountainIcon, RakaposhiRidgeDivider } from '@/components/icons';

export function Footer() {
  return (
    <footer className="w-full bg-raka-snow pt-space-8 pb-space-6 border-t border-raka-sand">
      <Container>
        {/* 3-Column Trust Strip (Post-purchase assurance) */}
        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-3 mb-space-8">
          <div className="flex flex-col gap-2 p-4 bg-raka-paper border border-raka-sand rounded-crisp">
            <DeliveryIcon size={24} className="text-raka-copper-deep" />
            <span className="text-[13px] font-semibold text-raka-ink">Delivery across Pakistan</span>
            <span className="text-[12px] text-raka-taupe">[X to Y working days]</span>
          </div>

          <div className="flex flex-col gap-2 p-4 bg-raka-paper border border-raka-sand rounded-crisp">
            <CashOnDeliveryIcon size={24} className="text-raka-copper-deep" />
            <span className="text-[13px] font-semibold text-raka-ink">Cash on delivery</span>
            <span className="text-[12px] text-raka-taupe">[confirm before launch]</span>
          </div>

          <div className="flex flex-col gap-2 p-4 bg-raka-paper border border-raka-sand rounded-crisp">
            <MountainIcon size={24} className="text-raka-copper-deep" />
            <span className="text-[13px] font-semibold text-raka-ink">Made in Pakistan</span>
            <span className="text-[12px] text-raka-taupe">For our hair, water and weather</span>
          </div>
        </div>

        {/* Rakaposhi Ridge Signature Divider (Max once per page) */}
        <RakaposhiRidgeDivider />

        {/* Footer Navigation & Brand Line */}
        <div className="pt-space-6 border-t border-raka-ink/20 flex flex-col tablet:flex-row items-center justify-between gap-4 text-[13px] text-raka-taupe">
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="no-underline text-raka-taupe hover:text-raka-ink transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="no-underline text-raka-taupe hover:text-raka-ink transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="no-underline text-raka-taupe hover:text-raka-ink transition-colors">
              Contact & WhatsApp
            </Link>
          </div>

          <p className="m-0 text-center tablet:text-right">
            © {new Date().getFullYear()} RAKA · Purely powerful · Lahore, Pakistan
          </p>
        </div>
      </Container>
    </footer>
  );
}
