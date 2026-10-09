# RAKA First Circle — Pre-launch UX Prototype

**Brand:** RAKA · Purely Powerful  
**Website destination:** `https://raka.pk/first-circle`  
**Design system:** Near-black, warm champagne gold, ivory, editorial typography. Uses supplied RAKA logo. Does **not** display or reveal product or packaging imagery.

## What is included

- `index.html` — complete accessible landing page, mobile-first hero, brand story, benefits, signup, success/welcome, referral-sharing controls, FAQ, privacy notice draft, and welcome email preview.
- `styles.css` — responsive layouts from narrow phones through desktops; reduced-motion, keyboard-focus, and semantic UI support.
- `app.js` — interactive UX prototype with front-end validation of Pakistani phone numbers, separate email/WhatsApp/SMS permissions, a preview success state, demo referral link generation, native share/copy, and modal flows.
- `guide.html` — the complimentary seven-day hair-care habits guide referred to by the signup offer.
- `assets/` — original RAKA logo, transparent brand crops, and a ready-to-use three-page PDF care guide.
- `INTEGRATION.md` — requirements for real storage, confirmed membership, consent records, referrals, and transactional messages.

## Preview

Open `index.html` in a browser. For best results serve the folder locally:

```bash
python3 -m http.server 8080
# open http://localhost:8080/
```

You can register with demo values, preview confirmation, copy a unique **demo link** and view the welcome email. **No form details are transmitted or stored, no member is actually registered, no email or SMS is delivered, and demo referral links are not validated or tracked.** The prominent prototype notice should be removed only after a production backend is live.

## Product imagery

The design intentionally uses only abstract vector art, typography and the RAKA logo. No product models, packaging mockups, formulas, or bottle imagery are displayed.

## Before publishing

1. Complete, review and publish an accurate final Privacy Notice and legal contact details.
2. Connect a protected signup API and persistent, access-controlled database (details in `INTEGRATION.md`).
3. Add email address verification, email delivery, a real member preference/unsubscribe portal and compliant optional WhatsApp/SMS provider opt-ins.
4. Activate server-side referral tokens, attribution, abuse controls, and real registration status.
5. Connect a real welcome email and the `guide.html` / downloadable resource.
6. Connect analytics with appropriate privacy controls and your campaign UTMs.
7. Verify launch date and promised member benefits against operational readiness.
8. Run device, accessibility, legal, spam, and end-to-end delivery tests.

## Suggested launch page copy

- **SEO title:** RAKA First Circle | Your Private Invitation
- **Meta description:** Enter RAKA First Circle. Join the private pre-launch list for thoughtful scalp and hair care, get the 7 Days to Better Hair-Care Habits guide, and hear about the launch first.
- **Hero:** Good things begin beneath the surface.
- **Subhead:** A new chapter in considered scalp and hair care is taking shape. The details stay under wraps. The invitation is yours.
- **CTA:** Enter the First Circle

Note: The existing HTML refers to a guide named **7 Days to Better Hair-Care Habits**. Keep the delivered file and any SEO snippets consistent with that final name.
