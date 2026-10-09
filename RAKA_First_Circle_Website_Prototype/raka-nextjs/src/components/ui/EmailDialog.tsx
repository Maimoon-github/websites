"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface EmailDialogProps {
  isOpen: boolean;
  firstName?: string;
  onClose: () => void;
}

export default function EmailDialog({
  isOpen,
  firstName,
  onClose,
}: EmailDialogProps) {
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

  const greeting = firstName ? `Hello, ${firstName},` : "Hello,";

  return (
    <dialog
      ref={dialogRef}
      id="email-dialog"
      className="content-dialog email-dialog"
      aria-labelledby="email-title"
      onClick={handleBackdropClick}
      onClose={onClose}
    >
      <div className="dialog-top">
        <span>EMAIL EXPERIENCE / PREVIEW</span>
        <button
          className="dialog-close"
          aria-label="Close email preview"
          onClick={onClose}
          type="button"
        >
          ✕
        </button>
      </div>
      <div className="dialog-body email-body">
        <p className="email-label">SUBJECT</p>
        <p className="email-subject">Welcome to RAKA First Circle.</p>
        <div className="email-paper">
          <Image
            src="/brand/raka-wordmark.png"
            alt="RAKA"
            width={100}
            height={42}
            style={{ width: "100px", height: "auto", objectFit: "contain" }}
          />
          <p className="email-overline">WELCOME TO THE FIRST CIRCLE</p>
          <h2 id="email-title">
            You&apos;re part of
            <br />
            <em>what&apos;s next.</em>
          </h2>
          <p id="email-personal">{greeting}</p>
          <p>
            Thank you for joining RAKA First Circle. We&apos;re preparing a
            thoughtful new chapter in scalp and hair care, and we&apos;re glad
            you&apos;re here before the reveal.
          </p>
          <p>
            Your complimentary guide,{" "}
            <strong>7 Days to Better Hair-Care Habits</strong>, can be{" "}
            <Link
              href="/guide"
              style={{ color: "#e3c48f", textDecoration: "underline" }}
              onClick={onClose}
            >
              previewed here
            </Link>
            . The live email delivery will be connected before launch.
          </p>
          <p>
            Expect considerate care notes and the official launch announcement —
            never a flood of messages.
          </p>
          <p>
            RAKA
            <br />
            <small>PURELY POWERFUL</small>
          </p>
        </div>
        <p className="email-footnote">
          Email preview only. A live transactional provider and working guide
          file are required before messages can be delivered.
        </p>
      </div>
    </dialog>
  );
}
