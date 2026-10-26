import React from 'react';

/**
 * Top Announcement Bar with smooth marquee animation.
 * Features launch date notice, free delivery threshold, and Pakistan COD.
 * Uses exact token color #E7A98A (Alpenglow) with border #D99677.
 */
export function AnnouncementBar() {
  const marqueeItems = [
    'Free delivery over Rs [X]',
    'Cash on delivery across Pakistan [confirm]',
    'Gift wrapping on every set',
    'Launching 1 December 2026',
  ];

  return (
    <aside
      role="region"
      aria-label="Announcement"
      className="w-full bg-[#E7A98A] overflow-hidden whitespace-nowrap border-b border-[#D99677] select-none"
    >
      <div className="rk-marquee inline-flex gap-10 py-2.5 text-[12px] font-bold tracking-[0.14em] uppercase text-raka-ink">
        {marqueeItems.map((text, idx) => (
          <React.Fragment key={`marquee-1-${idx}`}>
            <span>{text}</span>
            <span aria-hidden="true">✦</span>
          </React.Fragment>
        ))}
        {marqueeItems.map((text, idx) => (
          <React.Fragment key={`marquee-2-${idx}`}>
            <span>{text}</span>
            <span aria-hidden="true">✦</span>
          </React.Fragment>
        ))}
      </div>
    </aside>
  );
}
