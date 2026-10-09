import RegistrationForm from "./RegistrationForm";

interface RegistrationSectionProps {
  initialRef?: string;
  onOpenPrivacy: () => void;
  onOpenEmail: () => void;
  onToast: (msg: string) => void;
  onSuccess?: (name: string) => void;
}

export default function RegistrationSection({
  initialRef,
  onOpenPrivacy,
  onOpenEmail,
  onToast,
  onSuccess,
}: RegistrationSectionProps) {
  return (
    <section className="registration-section" id="join" aria-labelledby="join-title">
      <div className="container register-grid">
        <div className="register-copy">
          <p className="overline">03 — YOUR PRIVATE INVITATION</p>
          <h2 id="join-title">
            Be here
            <br />
            <em>before the beginning.</em>
          </h2>
          <p>
            Sign up for RAKA First Circle. It&apos;s complimentary, and
            there&apos;s no purchase commitment. We&apos;ll share our care guide
            and keep you close to the launch.
          </p>
          <div className="register-detail">
            <span className="detail-star" aria-hidden="true">
              ✦
            </span>
            <div>
              <strong>7 Days to Better Hair-Care Habits</strong>
              <small>
                A practical, easy-to-read guide prepared for First Circle
                members.
              </small>
            </div>
          </div>
          <p className="fine-note">
            RAKA First Circle is for people in Pakistan. Joining doesn&apos;t
            guarantee stock allocation, a discount, or priority purchasing.
          </p>
        </div>

        <RegistrationForm
          initialRef={initialRef}
          onOpenPrivacy={onOpenPrivacy}
          onOpenEmail={onOpenEmail}
          onToast={onToast}
          onSuccess={onSuccess}
        />
      </div>
    </section>
  );
}
