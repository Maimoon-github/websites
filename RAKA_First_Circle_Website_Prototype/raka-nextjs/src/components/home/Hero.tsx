import HeroSvg from "./HeroSvg";

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-noise" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="tiny-line" aria-hidden="true" /> A PRIVATE
            INVITATION · PAKISTAN
          </p>
          <h1 id="hero-title">
            Good things
            <br />
            begin <em>beneath</em>
            <br />
            the surface.
          </h1>
          <p className="hero-description">
            A new chapter in considered scalp and hair care is taking shape. The
            details stay under wraps. The invitation is yours.
          </p>
          <div className="hero-actions">
            <a className="btn btn-gold" href="#join">
              Enter the First Circle <span aria-hidden="true">↗</span>
            </a>
            <a href="#idea" className="underlined-link">
              Discover our thinking <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-proof">
            <span className="diamond-icon" aria-hidden="true">
              ✦
            </span>{" "}
            NO PRODUCT REVEAL. NO EMPTY PROMISES.
          </div>
        </div>

        <div
          className="hero-art"
          aria-label="Abstract gold arcs and mountains inspired by the RAKA identity; no products are shown"
        >
          <HeroSvg />
          <div className="art-caption">
            <span>01 / 01</span>
            <span>THE UNSEEN STANDARD</span>
          </div>
          <div className="art-side-label" aria-hidden="true">
            CRAFTED WITH INTENTION — RAKA.PK
          </div>
        </div>
      </div>

      <div className="hero-bottom container">
        <span>SCROLL TO EXPLORE</span>
        <span>
          THE FIRST CIRCLE EXPERIENCE <span aria-hidden="true">↘</span>
        </span>
      </div>
    </section>
  );
}
