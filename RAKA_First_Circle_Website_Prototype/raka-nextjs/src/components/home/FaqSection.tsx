import { FAQ_ITEMS } from "@/data/faqs";

export default function FaqSection() {
  return (
    <section className="faq-section" id="questions" aria-labelledby="faq-title">
      <div className="container faq-grid">
        <div>
          <p className="overline">04 — THE DETAILS</p>
          <h2 id="faq-title">
            Good to
            <br />
            <em>know.</em>
          </h2>
        </div>
        <div className="faq-items">
          {FAQ_ITEMS.map((item, index) => (
            <details key={index}>
              <summary>
                {item.question} <span aria-hidden="true">+</span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
