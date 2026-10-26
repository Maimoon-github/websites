'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { WishlistIcon, PhotoPlaceholderIcon } from '@/components/icons';
import { useCart } from '@/lib/cart-context';
import { PRODUCT_TABS, PRODUCTS_BY_TAB, TabId } from '@/lib/homepage-data';

export function LaunchEditSection() {
  const [activeTab, setActiveTab] = useState<TabId>('hair');
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const { addToBag } = useCart();

  const toggleWishlist = (productName: string) => {
    setWishlist((prev) => ({ ...prev, [productName]: !prev[productName] }));
  };

  const products = PRODUCTS_BY_TAB[activeTab] || [];

  return (
    <section aria-labelledby="launch-edit-heading" className="max-w-[1360px] mx-auto px-6 pt-[72px]">
      {/* Header & Tabs */}
      <div className="flex justify-between items-end gap-4 flex-wrap mb-5">
        <div className="flex flex-col gap-2.5">
          <span className="text-[12px] font-bold tracking-[0.14em] uppercase text-raka-copper-deep">
            The launch edit
          </span>
          <h2
            id="launch-edit-heading"
            className="m-0 font-display font-normal text-[clamp(2rem,3.4vw,2.9rem)] leading-none text-raka-ink"
          >
            New to{' '}
            <span className="font-display italic text-raka-copper-deep">RAKA</span>
          </h2>
        </div>

        {/* Tab List */}
        <div
          role="tablist"
          aria-label="Product categories"
          className="rk-scroll flex gap-2 overflow-x-auto max-w-full pb-1"
        >
          {PRODUCT_TABS.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveTab(tab.id)}
                className={`h-[42px] px-[18px] rounded-capsule whitespace-nowrap font-interface text-[14px] font-bold transition-all focus-visible:outline-none ${
                  isSelected
                    ? 'bg-raka-ink text-raka-paper border border-raka-ink'
                    : 'bg-raka-paper text-raka-ink border border-raka-sand hover:bg-raka-snow'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Horizontally scrolling product cards */}
      <div className="rk-scroll grid grid-flow-col auto-cols-[minmax(240px,1fr)] gap-[18px] overflow-x-auto pb-1.5">
        {products.map((product) => (
          <article
            key={product.name}
            className="rk-card bg-raka-paper border border-raka-sand rounded-card overflow-hidden flex flex-col group"
          >
            {/* 4:5 Aspect Ratio Image Wrapper */}
            <div
              className="relative aspect-[4/5] overflow-hidden flex items-end justify-center"
              style={{ backgroundColor: product.bg }}
            >
              {product.img ? (
                <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  className="object-cover object-[center_60%]"
                  sizes="(max-width: 768px) 240px, 280px"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-raka-taupe text-[12px] font-semibold text-center px-5 select-none">
                  <PhotoPlaceholderIcon size={34} />
                  <span>[Product photo]</span>
                </div>
              )}

              {/* Tag / Badge */}
              {product.badge && (
                <span
                  className="absolute top-3 left-3 px-2 py-1 rounded-crisp text-[10px] font-extrabold tracking-[0.12em] uppercase select-none shadow-sm"
                  style={{
                    backgroundColor: product.badgeBg || '#14110F',
                    color: product.badgeFg || '#FFFFFF',
                  }}
                >
                  {product.badge}
                </span>
              )}

              {/* Wishlist Button (44x44px touch target) */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.name)}
                aria-label={`Save ${product.name} to wishlist`}
                className="absolute top-2 right-2 w-11 h-11 rounded-capsule border-none bg-raka-paper text-raka-ink flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-all focus-visible:outline-none"
              >
                <WishlistIcon
                  size={18}
                  fill={wishlist[product.name] ? '#C2412D' : 'none'}
                  stroke={wishlist[product.name] ? '#C2412D' : 'currentColor'}
                />
              </button>
            </div>

            {/* Meta & Actions */}
            <div className="p-4 pt-4 pb-[18px] flex flex-col gap-1.5 flex-1">
              <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-raka-copper-deep">
                {product.cat}
              </span>
              <span className="text-[16px] font-bold leading-[1.3] text-raka-ink line-clamp-1">
                {product.name}
              </span>
              <span className="text-[13px] leading-[1.45] text-raka-taupe line-clamp-1">
                {product.note}
              </span>

              {/* Color Swatches */}
              <div className="flex gap-1.5 mt-1 min-h-[18px]">
                {product.swatches?.map((swatch) => (
                  <span
                    key={swatch.name}
                    title={swatch.name}
                    className="w-4 h-4 rounded-capsule border border-[#CDBFAF]"
                    style={{ backgroundColor: swatch.hex }}
                  />
                ))}
              </div>

              {/* Price & Add to Bag */}
              <div className="flex justify-between items-center mt-auto pt-2.5 gap-2.5">
                <span className="text-[17px] font-extrabold text-raka-ink">Rs [PRICE]</span>
                <button
                  type="button"
                  onClick={() => addToBag(product.name)}
                  className="h-10 min-h-[44px] px-4 rounded-capsule border border-raka-ink bg-raka-paper text-raka-ink font-interface text-[13px] font-bold hover:bg-raka-ink hover:text-raka-paper active:scale-[0.98] transition-all focus-visible:outline-none"
                >
                  Add to bag
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
