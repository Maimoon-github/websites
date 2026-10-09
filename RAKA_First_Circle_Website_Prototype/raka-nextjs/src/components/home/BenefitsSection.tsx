import { BENEFIT_ITEMS } from "@/data/benefits";

export default function BenefitsSection() {
  return (
    <section
      className="benefits-section"
      id="benefits"
      aria-labelledby="benefits-title"
    >
      <div className="container">
        <div className="section-topline">
          <p className="overline">02 — INSIDE THE CIRCLE</p>
          <span>CONSIDER THIS YOUR INVITATION</span>
        </div>
        <h2 id="benefits-title">
          A little closer
          <br />
          to <em>what&apos;s next.</em>
        </h2>
        <div className="benefit-grid">
          {BENEFIT_ITEMS.map((item) => (
            <article key={item.number} className="benefit">
              <div className="benefit-number">{item.number}</div>
              <div className="benefit-icon" aria-hidden="true">
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
