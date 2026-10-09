export default function InvitationSection() {
  return (
    <section className="invitation-section" aria-labelledby="invitation-title">
      <div className="container invitation-inner">
        <span className="overline">A NOTE FROM RAKA</span>
        <h2 id="invitation-title">
          The reveal can wait.
          <br />
          <em>Good care shouldn&apos;t.</em>
        </h2>
        <p>
          While we prepare our first introduction, we&apos;ll keep sharing
          knowledge worth knowing. No rush. No noise. Just a better beginning.
        </p>
        <a href="#join" className="btn btn-outline">
          Join the invitation <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
