"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface FooterProps {
  onOpenPrivacy?: () => void;
}

export default function Footer({ onOpenPrivacy }: FooterProps) {
  const yearRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (yearRef.current) {
      yearRef.current.textContent = String(new Date().getFullYear());
    }
  }, []);

  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Image
            src="/brand/raka-original-logo.jpg"
            alt="RAKA — Purely Powerful"
            width={130}
            height={130}
            style={{ width: "114px", height: "114px", objectFit: "contain" }}
          />
          <p>
            Purely Powerful.
            <br />
            Thoughtfully introduced.
          </p>
        </div>

        <div className="footer-side">
          <p>RAKA FIRST CIRCLE</p>
          <a href="#join">Join the Circle ↗</a>
          <button
            type="button"
            onClick={onOpenPrivacy}
            aria-label="Open Privacy Notice dialog"
          >
            Privacy Notice ↗
          </button>
          <a href="https://raka.pk" target="_blank" rel="noopener noreferrer">
            RAKA.PK ↗
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © <span ref={yearRef}>2026</span> RAKA. All rights reserved.
        </span>
        <span>MADE FOR A BETTER BEGINNING · PAKISTAN</span>
      </div>
    </footer>
  );
}
