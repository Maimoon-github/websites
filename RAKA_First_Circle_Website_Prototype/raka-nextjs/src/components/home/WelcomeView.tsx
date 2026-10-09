"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface WelcomeViewProps {
  firstName: string;
  referralLink: string;
  onOpenEmail: () => void;
  onReset: () => void;
  onToast: (msg: string) => void;
}

export default function WelcomeView({
  firstName,
  referralLink,
  onOpenEmail,
  onReset,
  onToast,
}: WelcomeViewProps) {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus({ preventScroll: true });
    }
  }, []);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(referralLink);
      } else if (inputRef.current) {
        inputRef.current.select();
        const success = document.execCommand("copy");
        if (!success) throw new Error("copy failed");
        inputRef.current.setSelectionRange(0, 0);
      }
      onToast("Invitation link copied. It becomes active after deployment.");
    } catch {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
      onToast("Select and copy your invitation link.");
    }
  };

  const handleShare = () => {
    const data = {
      title: "Join RAKA First Circle",
      text: "A thoughtful new chapter in scalp and hair care. Join RAKA First Circle.",
      url: referralLink,
    };
    if (navigator.share) {
      navigator.share(data).catch(() => {});
    } else {
      handleCopy();
    }
  };

  const friendlyName = firstName.trim() ? `, ${firstName.trim()}` : "";

  return (
    <section
      id="welcome-view"
      className="welcome-view"
      aria-labelledby="welcome-title"
    >
      <div className="welcome-emblem" aria-hidden="true">
        ✦
      </div>
      <p className="overline">REGISTRATION FLOW PREVIEW</p>
      <h3 id="welcome-title" ref={titleRef} tabIndex={-1}>
        Welcome to
        <br />
        <em>the First Circle.</em>
      </h3>
      <p id="welcome-greeting">
        Thank you for your interest{friendlyName}. Your RAKA First Circle welcome
        experience is shown below.
      </p>

      <div className="demo-alert">
        <strong>Preview mode</strong>
        <span>
          This is a demonstration of the signup experience. No information has
          been sent or saved to a RAKA server, and no email has been delivered.
        </span>
      </div>

      <div className="invite-card">
        <span className="invite-card-label">YOUR PERSONAL INVITE LINK</span>
        <div className="invite-link-row">
          <input
            id="referral-link"
            ref={inputRef}
            type="text"
            readOnly
            aria-label="Your demo referral link"
            value={referralLink}
          />
          <button
            type="button"
            id="copy-referral"
            aria-label="Copy referral link"
            onClick={handleCopy}
          >
            Copy ↗
          </button>
        </div>
        <p>
          Share it with someone who might love thoughtful hair care. Invitations
          and referral tracking become active after the live backend is
          connected.
        </p>
      </div>

      <div className="welcome-actions">
        <button
          type="button"
          className="btn btn-dark submit-btn"
          id="view-email"
          onClick={onOpenEmail}
          style={{ marginTop: 0 }}
        >
          Preview welcome email <span aria-hidden="true">↗</span>
        </button>
        <button
          type="button"
          className="small-action"
          id="share-referral"
          onClick={handleShare}
        >
          Share invitation
        </button>
        <Link href="/guide" className="small-action">
          Read the 7-day guide ↗
        </Link>
        <a
          href="/guides/raka-7-day-hair-care-guide.pdf"
          className="small-action"
          download="RAKA-7-Day-Hair-Care-Guide.pdf"
        >
          Download the PDF guide ↓
        </a>
      </div>

      <button
        type="button"
        id="reset-flow"
        className="reset-link"
        onClick={onReset}
      >
        Try another registration ↻
      </button>
    </section>
  );
}
