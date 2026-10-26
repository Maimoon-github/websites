import React from 'react';
import { DeliveryIcon, CashOnDeliveryIcon, ReturnsIcon, MountainIcon } from '@/components/icons';
import { TRUST_ITEMS } from '@/lib/homepage-data';

export function TrustStrip() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'delivery':
        return <DeliveryIcon size={26} stroke="#8E5530" className="flex-none" />;
      case 'cod':
        return <CashOnDeliveryIcon size={26} stroke="#8E5530" className="flex-none" />;
      case 'returns':
        return <ReturnsIcon size={26} stroke="#8E5530" className="flex-none" />;
      case 'mountain':
        return <MountainIcon size={26} stroke="#8E5530" className="flex-none" />;
      default:
        return null;
    }
  };

  return (
    <section aria-label="Customer trust guarantees" className="max-w-[1360px] mx-auto px-6 pt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 laptop:grid-cols-4 gap-[1px] bg-raka-sand border border-raka-sand rounded-card overflow-hidden">
        {TRUST_ITEMS.map((item) => (
          <div
            key={item.id}
            className="bg-raka-paper px-[18px] py-4 flex gap-3 items-center"
          >
            {getIcon(item.icon)}
            <div>
              <div className="text-[14px] font-bold text-raka-ink">{item.title}</div>
              <div className="text-[13px] text-raka-taupe">{item.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
