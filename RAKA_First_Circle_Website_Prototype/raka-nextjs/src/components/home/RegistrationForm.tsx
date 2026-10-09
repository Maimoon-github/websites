"use client";

import { useState, useRef } from "react";
import {
  validateEmail,
  normalizePakistaniMobile,
  generateReferralCode,
  isValidReferralCode,
} from "@/lib/utils";
import WelcomeView from "./WelcomeView";

interface RegistrationFormProps {
  initialRef?: string;
  onOpenPrivacy: () => void;
  onOpenEmail: () => void;
  onToast: (msg: string) => void;
  onSuccess?: (name: string) => void;
}

export default function RegistrationForm({
  initialRef = "",
  onOpenPrivacy,
  onOpenEmail,
  onToast,
  onSuccess,
}: RegistrationFormProps) {
  const hasValidIncomingRef = Boolean(
    initialRef && isValidReferralCode(initialRef)
  );

  // Form fields
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyHoneypot, setCompanyHoneypot] = useState("");
  const [emailConsent, setEmailConsent] = useState(false);
  const [whatsappConsent, setWhatsappConsent] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  const [privacyAck, setPrivacyAck] = useState(false);

  // Errors
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [channelError, setChannelError] = useState("");
  const [privacyError, setPrivacyError] = useState("");
  const [formError, setFormError] = useState("");

  // Submission state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referralLink, setReferralLink] = useState("");

  // Refs for focusing on error
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const emailConsentRef = useRef<HTMLInputElement | null>(null);
  const privacyAckRef = useRef<HTMLInputElement | null>(null);
  const formViewRef = useRef<HTMLDivElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setNameError("");
    setEmailError("");
    setPhoneError("");
    setChannelError("");
    setPrivacyError("");
    setFormError("");

    // Honeypot check
    if (companyHoneypot.trim()) {
      onToast("Please check your details.");
      return;
    }

    let firstInvalidEl: HTMLInputElement | null = null;
    const registerInvalid = (el: HTMLInputElement | null) => {
      if (!firstInvalidEl && el) {
        firstInvalidEl = el;
      }
    };

    let hasError = false;

    if (firstName.trim().length > 50) {
      setNameError("Please use 50 characters or fewer.");
      registerInvalid(nameInputRef.current);
      hasError = true;
    }

    if (!validateEmail(email)) {
      setEmailError("Enter a valid email address.");
      registerInvalid(emailInputRef.current);
      hasError = true;
    }

    const normalizedPhone = normalizePakistaniMobile(phone);
    if (!normalizedPhone) {
      setPhoneError(
        "Enter a valid Pakistani mobile number, for example 03001234567."
      );
      registerInvalid(phoneInputRef.current);
      hasError = true;
    }

    if (!emailConsent) {
      setChannelError(
        "Email permission is required for this email-based launch list."
      );
      registerInvalid(emailConsentRef.current);
      hasError = true;
    }

    if (!privacyAck) {
      setPrivacyError("Please read and acknowledge the Privacy Notice.");
      registerInvalid(privacyAckRef.current);
      hasError = true;
    }

    if (hasError && firstInvalidEl) {
      (firstInvalidEl as HTMLInputElement).focus();
      return;
    }

    // Success flow: Generate demo referral token
    const code = generateReferralCode();
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "https://raka.pk";
    const personalLink = `${origin}/first-circle?ref=${code}`;

    setReferralLink(personalLink);
    setIsSubmitted(true);
    onSuccess?.(firstName);

    // Scroll to welcome view
    setTimeout(() => {
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      shellRef.current?.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "center",
      });
    }, 50);
  };

  const handleReset = () => {
    setFirstName("");
    setEmail("");
    setPhone("");
    setCompanyHoneypot("");
    setEmailConsent(false);
    setWhatsappConsent(false);
    setSmsConsent(false);
    setPrivacyAck(false);

    setNameError("");
    setEmailError("");
    setPhoneError("");
    setChannelError("");
    setPrivacyError("");
    setFormError("");

    setIsSubmitted(false);
    onSuccess?.("");

    setTimeout(() => {
      emailInputRef.current?.focus({ preventScroll: true });
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      shellRef.current?.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "center",
      });
    }, 50);
  };

  return (
    <div className="form-shell" ref={shellRef}>
      {!isSubmitted ? (
        <div id="form-view" ref={formViewRef}>
          <div className="form-header">
            <span className="form-step">
              YOUR DETAILS <b>01 / 01</b>
            </span>
            <span className="form-deco" aria-hidden="true">
              ✧
            </span>
          </div>

          <h3>You&apos;re invited.</h3>
          <p className="form-subhead">A few details, and you&apos;re in.</p>

          {hasValidIncomingRef && (
            <div id="invite-indicator" className="invite-indicator">
              <span aria-hidden="true">✦</span> You arrived with an invitation
              link.
            </div>
          )}

          <form id="signup-form" noValidate onSubmit={handleSubmit}>
            {/* Honeypot field */}
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="company">Leave this field empty</label>
              <input
                type="text"
                id="company"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={companyHoneypot}
                onChange={(e) => setCompanyHoneypot(e.target.value)}
              />
            </div>

            {/* First name */}
            <div className="field">
              <label htmlFor="name">
                First name <span className="field-optional">OPTIONAL</span>
              </label>
              <input
                id="name"
                name="first_name"
                ref={nameInputRef}
                type="text"
                autoComplete="given-name"
                maxLength={50}
                placeholder="How should we greet you?"
                value={firstName}
                aria-invalid={nameError ? "true" : "false"}
                aria-describedby="name-error"
                onChange={(e) => {
                  setFirstName(e.target.value);
                  if (nameError) setNameError("");
                }}
              />
              <p id="name-error" className="field-error" aria-live="polite">
                {nameError}
              </p>
            </div>

            {/* Email address */}
            <div className="field">
              <label htmlFor="email">
                Email address{" "}
                <span className="required" aria-label="required">
                  *
                </span>
              </label>
              <input
                id="email"
                name="email"
                ref={emailInputRef}
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                placeholder="you@example.com"
                value={email}
                aria-invalid={emailError ? "true" : "false"}
                aria-describedby="email-error"
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
              />
              <p id="email-error" className="field-error" aria-live="polite">
                {emailError}
              </p>
            </div>

            {/* Mobile number */}
            <div className="field">
              <label htmlFor="phone">
                Mobile number{" "}
                <span className="required" aria-label="required">
                  *
                </span>
              </label>
              <div className="phone-wrap">
                <span className="prefix" aria-hidden="true">
                  PK +92
                </span>
                <input
                  id="phone"
                  name="phone"
                  ref={phoneInputRef}
                  type="tel"
                  autoComplete="tel-national"
                  inputMode="tel"
                  required
                  placeholder="300 1234567"
                  value={phone}
                  aria-invalid={phoneError ? "true" : "false"}
                  aria-describedby="phone-hint phone-error"
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (phoneError) setPhoneError("");
                  }}
                />
              </div>
              <p id="phone-hint" className="field-hint">
                Enter a Pakistani mobile number, with or without +92.
              </p>
              <p id="phone-error" className="field-error" aria-live="polite">
                {phoneError}
              </p>
            </div>

            {/* Consent Group */}
            <fieldset className="consent-group">
              <legend>Stay in the know</legend>

              <label className="checkline" htmlFor="email-consent">
                <input
                  type="checkbox"
                  id="email-consent"
                  name="email_consent"
                  ref={emailConsentRef}
                  required
                  checked={emailConsent}
                  onChange={(e) => {
                    setEmailConsent(e.target.checked);
                    if (channelError) setChannelError("");
                  }}
                />
                <span className="custom-check" aria-hidden="true" />
                <span>
                  <strong>Email launch notes</strong>{" "}
                  <span className="required">*</span>
                  <small>
                    Send me RAKA First Circle emails, including the welcome
                    guide and launch updates. I can unsubscribe at any time.
                  </small>
                </span>
              </label>

              <label className="checkline" htmlFor="whatsapp-consent">
                <input
                  type="checkbox"
                  id="whatsapp-consent"
                  name="whatsapp_consent"
                  checked={whatsappConsent}
                  onChange={(e) => setWhatsappConsent(e.target.checked)}
                />
                <span className="custom-check" aria-hidden="true" />
                <span>
                  <strong>WhatsApp updates</strong>{" "}
                  <span className="optional">OPTIONAL</span>
                  <small>
                    I also agree to receive RAKA launch messages on WhatsApp at
                    this number.
                  </small>
                </span>
              </label>

              <label className="checkline" htmlFor="sms-consent">
                <input
                  type="checkbox"
                  id="sms-consent"
                  name="sms_consent"
                  checked={smsConsent}
                  onChange={(e) => setSmsConsent(e.target.checked)}
                />
                <span className="custom-check" aria-hidden="true" />
                <span>
                  <strong>SMS updates</strong>{" "}
                  <span className="optional">OPTIONAL</span>
                  <small>
                    I also agree to receive RAKA launch messages by text
                    message.
                  </small>
                </span>
              </label>

              <p id="channel-error" className="field-error" aria-live="polite">
                {channelError}
              </p>
            </fieldset>

            {/* Privacy Policy Checkbox */}
            <div className="policy-area">
              <label className="checkline policy-check" htmlFor="privacy-ack">
                <input
                  type="checkbox"
                  id="privacy-ack"
                  name="privacy_ack"
                  ref={privacyAckRef}
                  required
                  checked={privacyAck}
                  onChange={(e) => {
                    setPrivacyAck(e.target.checked);
                    if (privacyError) setPrivacyError("");
                  }}
                />
                <span className="custom-check" aria-hidden="true" />
                <span>
                  I have read the{" "}
                  <button
                    type="button"
                    className="inline-button"
                    onClick={onOpenPrivacy}
                  >
                    Privacy Notice
                  </button>{" "}
                  and understand how RAKA will use my registration details.{" "}
                  <span className="required">*</span>
                </span>
              </label>
              <p id="privacy-error" className="field-error" aria-live="polite">
                {privacyError}
              </p>
            </div>

            {formError && (
              <p id="form-error" className="form-error" role="alert">
                {formError}
              </p>
            )}

            <button
              className="btn btn-dark submit-btn"
              type="submit"
              id="submit-btn"
            >
              Join RAKA First Circle <span aria-hidden="true">↗</span>
            </button>

            <p className="form-disclaimer">
              Free to join. No purchase required. Your information is not sent
              anywhere in this interactive preview.
            </p>
          </form>
        </div>
      ) : (
        <WelcomeView
          firstName={firstName}
          referralLink={referralLink}
          onOpenEmail={onOpenEmail}
          onReset={handleReset}
          onToast={onToast}
        />
      )}
    </div>
  );
}
