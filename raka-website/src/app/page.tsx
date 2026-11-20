import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-raka-snow px-6 py-12 text-raka-ink tablet:px-12 desktop:px-20">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* Brand Header Verification */}
        <header className="flex items-center gap-4 border-b border-raka-sand pb-6">
          <Image
            src="/brand/raka-logo.webp"
            alt="RAKA Emblem"
            width={52}
            height={52}
            priority
            className="rounded-full shadow-e1"
          />
          <div>
            <h2 className="font-interface text-xs font-semibold tracking-widest text-raka-copper-deep uppercase">
              Design System · Phase 1 Verification
            </h2>
            <p className="font-interface text-sm text-raka-taupe">
              Tailwind CSS v4 & Next.js Typography Foundation
            </p>
          </div>
        </header>

        {/* 1. Display Typography (Libre Caslon Condensed) */}
        <section className="space-y-3">
          <span className="font-interface text-xs font-bold tracking-wider text-raka-taupe uppercase">
            1. Display Typography · Libre Caslon Condensed
          </span>
          <h1 className="font-display text-4xl leading-tight tablet:text-6xl">
            Your hair ritual,{" "}
            <em className="raka-italic-turn">upgraded.</em>
          </h1>
        </section>

        {/* 2. Interface Typography (Manrope) */}
        <section className="space-y-3">
          <span className="font-interface text-xs font-bold tracking-wider text-raka-taupe uppercase">
            2. Interface Typography · Manrope
          </span>
          <p className="font-interface text-base leading-relaxed text-raka-bark">
            Formulated for Pakistani hair, hard water, and regional weather.
            Snowfield canvas, warm copper accents, and unretouched skin textures.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <span className="rounded-crisp bg-raka-ink px-4 py-2 font-interface text-xs font-semibold text-raka-paper">
              Primary Buy · Ink
            </span>
            <span className="rounded-crisp bg-raka-copper px-4 py-2 font-interface text-xs font-semibold text-raka-ink">
              Join Action · Copper
            </span>
            <span className="rounded-crisp border border-raka-sand bg-raka-paper px-4 py-2 font-interface text-xs font-medium text-raka-bark">
              Rs 2,850 · Tabular PKR
            </span>
          </div>
        </section>

        {/* 3. Regional Typography (Noto Nastaliq Urdu) */}
        <section className="space-y-3 rounded-card border border-raka-sand bg-raka-paper p-6 shadow-e1">
          <span className="font-interface text-xs font-bold tracking-wider text-raka-taupe uppercase">
            3. Regional Urdu Typography · Noto Nastaliq Urdu
          </span>
          <p
            className="font-urdu text-2xl leading-[2.2] text-raka-ink tablet:text-3xl"
            dir="rtl"
          >
            پاکستانی بالوں، پانی اور موسم کے لیے خالص اور مؤثر دیکھ بھال۔ راکاپوشی کی چوٹی سے متاثر۔
          </p>
        </section>

        {/* 4. Brand Asset Verification */}
        <section className="space-y-3">
          <span className="font-interface text-xs font-bold tracking-wider text-raka-taupe uppercase">
            4. Brand Asset Resolution
          </span>
          <div className="flex items-center gap-6 rounded-card border border-raka-sand bg-raka-paper p-6 shadow-e1">
            <div className="relative h-44 w-28 overflow-hidden rounded-crisp bg-[#EEEAE5]">
              <Image
                src="/brand/hair-fall-control-oil.jpg"
                alt="Hair Fall Control Treatment Oil"
                fill
                sizes="120px"
                className="object-contain"
              />
            </div>
            <div className="space-y-2">
              <span className="rounded-crisp bg-raka-alpenglow-tint px-2.5 py-1 font-interface text-xs font-bold tracking-wider text-raka-ink uppercase">
                Launch Offer
              </span>
              <h3 className="font-display text-2xl text-raka-ink">
                Hair Fall Control Treatment Oil
              </h3>
              <p className="font-interface text-sm text-raka-taupe">
                200 ml · Verified asset loading at `/brand/hair-fall-control-oil.jpg`
              </p>
            </div>
          </div>
        </section>

        {/* 5. Design Token Palette Swatches */}
        <section className="space-y-3">
          <span className="font-interface text-xs font-bold tracking-wider text-raka-taupe uppercase">
            5. Design Token Swatches
          </span>
          <div className="grid grid-cols-2 gap-3 tablet:grid-cols-5">
            <div className="rounded-card border border-raka-sand bg-raka-snow p-3 text-center">
              <span className="font-interface text-xs font-medium text-raka-ink">Snowfield</span>
            </div>
            <div className="rounded-card border border-raka-sand bg-raka-paper p-3 text-center">
              <span className="font-interface text-xs font-medium text-raka-ink">Paper</span>
            </div>
            <div className="rounded-card bg-raka-copper p-3 text-center">
              <span className="font-interface text-xs font-medium text-raka-ink">Copper</span>
            </div>
            <div className="rounded-card bg-raka-alpenglow p-3 text-center">
              <span className="font-interface text-xs font-medium text-raka-ink">Alpenglow</span>
            </div>
            <div className="rounded-card bg-raka-ink p-3 text-center">
              <span className="font-interface text-xs font-medium text-raka-paper">Ink</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
