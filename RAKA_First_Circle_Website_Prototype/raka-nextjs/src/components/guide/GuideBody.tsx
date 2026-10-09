import { GUIDE_LESSONS } from "@/data/guideLessons";

export default function GuideBody() {
  return (
    <section className="guide-body">
      <div className="container">
        <p className="guide-intro">
          You don&apos;t need to change everything in a day. Each day, take one
          small step and notice what works for your hair and scalp. These are
          general tips, not individualized medical advice.
        </p>

        {GUIDE_LESSONS.map((lesson) => (
          <article key={lesson.day} className="guide-card">
            <div className="guide-day">{lesson.day}</div>
            <div>
              <h2>{lesson.title}</h2>
              <p>{lesson.description}</p>
              <p className="action">Today&apos;s practice: {lesson.practice}</p>
            </div>
          </article>
        ))}

        <div className="guide-note">
          <strong>An important note:</strong> Hair shedding, breakage, scalp
          dryness, dandruff, and different forms of hair loss can require
          different approaches. These lessons are for general education and do
          not diagnose, treat, or promise hair regrowth.
        </div>

        <div className="guide-actions">
          <a
            className="btn btn-dark"
            href="/guides/raka-7-day-hair-care-guide.pdf"
            download="RAKA-7-Day-Hair-Care-Guide.pdf"
          >
            Download this guide as PDF ↓
          </a>
        </div>
      </div>
    </section>
  );
}
