# RAKA First Circle — Production Integration Blueprint

## 1. Scope and current status

The supplied website is an **interactive UX prototype**, not a deployed or operational registration service. The user can fill both email and phone, choose distinct email / WhatsApp / SMS permissions, open a draft Privacy Notice, experience welcome confirmation, create a copyable demo invitation link, and preview the welcome email/guide. **No registration data is transferred or persisted and no invitation can be confirmed in this prototype.**

To make First Circle production-ready, connect the following back-end components. Implementation must be reviewed for applicable privacy, communications, and Pakistan-specific obligations.

## 2. Registration lifecycle (recommended)

1. Visitor arrives at `raka.pk/first-circle` with optional `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, and `ref` query params.
2. Visitor supplies name (optional), email (required), Pakistani mobile number (required), mandatory consent to First Circle emails, separate optional WhatsApp/SMS opt-ins, and privacy notice acknowledgment.
3. Client-side validation supports: `3001234567`, `03001234567`, `923001234567`, `+923001234567`, normalizing to E.164 `+923001234567`. Backend **must** repeat validation.
4. Frontend posts via HTTPS to `POST /api/first-circle`. Include a CSRF defense / strict CORS policy as appropriate, rate limiting, bot protection, IP abuse controls, input size limits, and sanitized data storage. Do not rely on client validation or the honeypot alone.
5. Server deduplicates and stores a `pending_email_verification` record and consent evidence, then sends a single confirmation email with a short-lived, securely generated verification token. Do not announce confirmed membership before verification.
6. After user verifies their address through `GET /verify?token=...`, server marks membership `confirmed` and generates an opaque referral code. The verification landing page shows the welcome state and actual referral link.
7. Send the welcome email with the free guide URL (prefer signed or trackable links only where appropriate). Do not treat opting into email as consent to WhatsApp or SMS.
8. Optional WhatsApp/SMS messages must only start after channel-specific permission and any provider/template/opt-in obligations have been satisfied. A phone verification step may be required depending on your chosen provider and anti-abuse needs.
9. Email and channel preferences can be edited using an authenticated manage-preferences link; withdrawal is recorded and respected immediately. Offer complete deletion where permissible.

## 3. Suggested request schema

```json
{
  "first_name": "Ayesha",
  "email": "ayesha@example.com",
  "phone_e164": "+923001234567",
  "consents": {
    "email_first_circle": true,
    "whatsapp_marketing": false,
    "sms_marketing": false,
    "privacy_acknowledged": true,
    "privacy_notice_version": "2026-10-09-draft-replace-before-launch"
  },
  "attribution": {
    "referrer_code": "FC-0123ABCD5678",
    "utm_source": "instagram",
    "utm_medium": "organic",
    "utm_campaign": "first_circle"
  }
}
```

Only accept keys explicitly supported by your backend. Apply length limits and sanitize/refuse unexpected input. Log timestamps and consent text/version on the **server**. Avoid storing sensitive raw request details in analytics or logs. If the request is accepted, return `202 Accepted` with a neutral message such as `Check your inbox to confirm your registration` so attackers cannot enumerate existing email addresses.

## 4. Suggested datastore

- `members`: `id`, `email_normalized` (unique), `phone_e164`, `first_name`, `status`, `created_at`, `confirmed_at`, `updated_at`, `deleted_at` where appropriate.
- `consent_events` (append-only): `member_id`, `channel`, `action`, `consent_text_version`, `notice_version`, `timestamp`, `source`, `proof_reference` (minimize IP/UA where possible).
- `referrals`: `referral_code` (unique random opaque token), `owner_id`, `invitee_id`, `created_at`, `confirmed_at`, `status`; referral counts should include **confirmed unique registrations only**.
- `message_events`: `member_id`, `channel`, `template_id`, `sent_at`, `provider_id`, `delivery_state`, `unsubscribe_at`.
- `email_verify_tokens`: hashed token, member_id, expires_at, used_at; never store raw verification tokens.
- `attribution_events` with permitted fields and short, documented retention.

Encrypt transport using HTTPS, enforce minimal access, securely store provider keys, implement retention/deletion jobs, and avoid exporting subscriber lists to unapproved marketing platforms.

## 5. Referral mechanics

- Generate token on **server only** after email verification, e.g. `FC-` followed by securely random characters.
- Shareable URL `https://raka.pk/first-circle?ref=FC-XXXXXXXXXXXX`.
- Show an invite banner on arrival but treat the referral as **unverified until the server validates it**.
- Associate inviter and invitee only after unique confirmed signup; disallow self-referrals and duplicate phone/email abuse.
- No leaderboards, referral rewards, or discount claims are in the current UX. If incentives are later introduced, publish clear rules, eligibility, and terms.
- Only share referral codes, never email addresses or member IDs, in URLs.

## 6. Welcome email experience

**From:** a verified RAKA-controlled sending domain (configure DNS / SPF / DKIM / DMARC)  
**Subject:** Welcome to RAKA First Circle.  
**Preheader:** A more thoughtful chapter in hair care begins here.  
**Greeting:** Hello {{first_name}},  
**Body:** Thank you for joining RAKA First Circle. We're preparing a thoughtful new chapter in scalp and hair care, and we're glad you're here before the reveal. Start with our complimentary guide, **7 Days to Better Hair-Care Habits**. You'll receive occasional care notes and the official launch announcement.  
**CTA:** Read your guide → [production link]  
**Footer:** Registered contact identity, privacy notice, manage preferences, functional unsubscribe, and applicable required disclosures.

**Sequence:** verification request → confirmed welcome + guide → value-driven care note → brand philosophy → launch-date announcement → official reveal, only as authorized. Do not send repeated promotions to pending/unverified addresses.

## 7. Privacy notice release checklist

Replace the draft preview notice with a complete, truthful, professionally reviewed page containing: accountable legal entity and contact address; data categories; purposes and lawful bases where applicable; communication channels and consent mechanism; exact processors and international transfers; retention periods; rights and request channel; safeguards described truthfully; complaints process; effective date and change policy.

Do not imply RAKA's manufacturer certifications are product clinical approvals. Avoid unsupported medical/therapeutic claims in ads and email. Confirm eligibility for promotional WhatsApp messaging based on the business/product classification and WhatsApp's current policies before deploying those integrations.

## 8. Analytics and SEO

- Use accessible, consent-aware analytics. Suggested events: `first_circle_view`, `signup_started`, `signup_validation_error`, `signup_pending`, `email_verified`, `guide_opened`, `referral_link_copied`, `referral_signup_confirmed`.
- Never send names, email addresses, phone numbers, or complete tokens to third-party analytics.
- Track high-level channel performance through UTMs, not by exposing individual member PII.
- The HTML includes a title, meta description, social sharing descriptions, canonical URL, structured WebPage data, semantic headings, labels, and responsive layout.
- Supply real social sharing image **without product or packaging** before going live.
- Test Core Web Vitals, screen-reader journeys, 320px mobile width, low network speeds, and CSS/JS failure states.
- Set `guide.html` to `noindex` or protect access if the guide is a gated signup benefit. Consider a downloadable accessible PDF if needed.

## 9. Production replacement points

- In `app.js`, replace the `form.addEventListener('submit', ...)` demo success with an authenticated API request and server response/error states. Do not generate final referral tokens in the browser.
- Only expose `welcome-view` after verification, or reword as a pending verification state.
- The draft privacy dialog should point to the final hosted notice once approved.
- The `prototype-ribbon`, `demo-alert` and disclaimer are intentional preview disclosures; remove them only after the backend, mailing provider and referral tracking are live.
- Check that the canonical URL exactly matches the deployed route. If serving `index.html` as `/first-circle/`, update canonical and share URLs consistently.
