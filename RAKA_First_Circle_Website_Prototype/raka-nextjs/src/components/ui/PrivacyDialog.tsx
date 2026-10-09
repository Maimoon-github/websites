"use client";

import { useEffect, useRef } from "react";

interface PrivacyDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyDialog({ isOpen, onClose }: PrivacyDialogProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      id="privacy-dialog"
      className="content-dialog"
      aria-labelledby="privacy-title"
      onClick={handleBackdropClick}
      onClose={onClose}
    >
      <div className="dialog-top">
        <span>RAKA / PRIVACY</span>
        <button
          className="dialog-close"
          aria-label="Close Privacy Notice"
          onClick={onClose}
          type="button"
        >
          ✕
        </button>
      </div>
      <div className="dialog-body">
        <p className="overline">DRAFT — REVIEW BEFORE LAUNCH</p>
        <h2 id="privacy-title">Privacy Notice.</h2>
        <p>
          This notice describes the planned RAKA First Circle registration
          experience. This version is for prototype review and must be
          finalized with RAKA&apos;s real contact details, processors, retention
          rules, and legal review before publication.
        </p>

        <h3>What we collect</h3>
        <p>
          Your optional first name, email address, Pakistani mobile number,
          selected communication preferences, referral code, registration
          time, and basic campaign attribution information.
        </p>

        <h3>Why we collect it</h3>
        <p>
          To administer First Circle registrations, deliver a welcome guide, and
          send the specific launch communications you request. Referral
          information, where provided, helps attribute invited signups.
        </p>

        <h3>Communication choices</h3>
        <p>
          Joining requires consent to First Circle emails. WhatsApp and SMS are
          independent optional choices. Each channel must support appropriate
          opt-out and preference updates. Marketing must not be sent to an
          unconsented channel.
        </p>

        <h3>Who handles the information</h3>
        <p>
          In a real deployment, RAKA would use approved hosting, database, and
          messaging providers acting under appropriate data-processing terms.
          Their identities and any cross-border transfers should be described
          in the final notice. This prototype sends no registration
          information to a server.
        </p>

        <h3>Retention and your choices</h3>
        <p>
          Define and publish a practical retention period before launching.
          Members should be able to withdraw consent, request access or
          correction, and request deletion subject to applicable requirements.
        </p>

        <h3>Contact and effective date</h3>
        <p>
          Add a monitored privacy contact address, legal entity details,
          effective date, and any Pakistan-specific disclosures after
          confirmation. Do not publish this draft as final legal wording.
        </p>
      </div>
    </dialog>
  );
}
