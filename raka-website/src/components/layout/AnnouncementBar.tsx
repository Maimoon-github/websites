import React from "react";

/**
 * Top Announcement Bar
 * Features launch date notice, free delivery terms, and Pakistan COD assurance.
 * Uses token colors: Linen (#EDE3D6) with border Sand (#E4D8CA).
 */
export function AnnouncementBar() {
  return (
    <aside
      role="region"
      aria-label="Launch announcement"
      className="w-full bg-raka-linen border-b border-raka-sand select-none py-2.5 px-4 text-center"
    >
      <div className="flex items-center justify-center gap-3 font-interface text-[12px] font-semibold tracking-[0.12em] uppercase text-raka-ink flex-wrap">
        <span>Launching 1 December 2026 · Lahore, Pakistan</span>
        <span aria-hidden="true" className="text-raka-copper-deep">✦</span>
        <span>Free delivery over Rs 4,000</span>
        <span aria-hidden="true" className="text-raka-copper-deep hidden tablet:inline">✦</span>
        <span className="hidden tablet:inline">Cash on delivery across Pakistan</span>
      </div>
    </aside>
  );
}
