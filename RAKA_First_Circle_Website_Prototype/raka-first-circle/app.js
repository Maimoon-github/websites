/* RAKA First Circle — interactive UX prototype.
   Form handling below simulates the complete on-page journey only.
   No submitted details are transmitted, persisted, or registered.
   Replace the submit handler with a verified /api/first-circle flow for production.
*/
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const form = $('signup-form');
  const toasts = $('toast');
  let toastTimer;

  const params = new URLSearchParams(window.location.search);
  const incomingRef = (params.get('ref') || '').toUpperCase().trim();
  if (/^FC-[A-Z0-9]{8,14}$/.test(incomingRef)) {
    $('invite-indicator').hidden = false;
  }
  $('year').textContent = String(new Date().getFullYear());

  function toast(message) {
    clearTimeout(toastTimer);
    toasts.textContent = message;
    toasts.classList.add('show');
    toastTimer = setTimeout(() => toasts.classList.remove('show'), 4000);
  }

  function markError(id, message) {
    const error = $(id + '-error');
    if (error) error.textContent = message;
    const el = $(id);
    if (el) el.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  function resetErrors() {
    ['name','email','phone'].forEach(id => markError(id, ''));
    $('channel-error').textContent = '';
    $('privacy-error').textContent = '';
    $('form-error').hidden = true;
  }

  function validateEmail(input) {
    // Browser-native type validation covers malformed addresses; this excludes common whitespace mistakes.
    const value = input.trim();
    return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  }

  function normalizePakistaniMobile(input) {
    const num = input.replace(/[\s().-]/g, '');
    // Formats: 3001234567, 03001234567, +923001234567, 923001234567
    if (/^3\d{9}$/.test(num)) return '+92' + num;
    if (/^03\d{9}$/.test(num)) return '+92' + num.slice(1);
    if (/^\+923\d{9}$/.test(num)) return num;
    if (/^923\d{9}$/.test(num)) return '+' + num;
    return null;
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    resetErrors();
    // Honeypot is deliberately treated as a no-op in preview mode.
    if ($('company').value.trim()) { toast('Please check your details.'); return; }

    const firstName = $('name').value.trim();
    const email = $('email').value.trim();
    const phone = normalizePakistaniMobile($('phone').value.trim());
    let firstInvalid = null;
    const invalid = id => { if (!firstInvalid) firstInvalid = $(id); };

    if (firstName.length > 50) { markError('name', 'Please use 50 characters or fewer.'); invalid('name'); }
    if (!validateEmail(email)) { markError('email', 'Enter a valid email address.'); invalid('email'); }
    if (!phone) { markError('phone', 'Enter a valid Pakistani mobile number, for example 03001234567.'); invalid('phone'); }
    if (!$('email-consent').checked) { $('channel-error').textContent = 'Email permission is required for this email-based launch list.'; invalid('email-consent'); }
    if (!$('privacy-ack').checked) { $('privacy-error').textContent = 'Please read and acknowledge the Privacy Notice.'; invalid('privacy-ack'); }
    if (firstInvalid) { firstInvalid.focus(); return; }

    // Actual production flow must POST to the backend, rate-limit, store consent evidence,
    // send a verification email, and only mark the member confirmed after verification.
    const bytes = new Uint8Array(6);
    crypto.getRandomValues(bytes);
    const code = 'FC-' + Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
    const personalLink = new URL('https://raka.pk/first-circle');
    personalLink.searchParams.set('ref', code);

    $('referral-link').value = personalLink.toString();
    const friendly = firstName ? ', ' + firstName : '';
    $('welcome-greeting').textContent = 'Thank you for your interest' + friendly + '. Your RAKA First Circle welcome experience is shown below.';
    $('email-personal').textContent = 'Hello' + friendly + ',';
    $('form-view').hidden = true;
    $('welcome-view').hidden = false;
    $('welcome-title').setAttribute('tabindex', '-1');
    $('welcome-title').focus({ preventScroll: true });
    $('welcome-view').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
  });

  ['name','email','phone'].forEach(id => $(id).addEventListener('input', () => markError(id, '')));
  $('email-consent').addEventListener('change', () => $('channel-error').textContent = '');
  $('privacy-ack').addEventListener('change', () => $('privacy-error').textContent = '');

  async function copyReferral() {
    const link = $('referral-link').value;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(link);
      } else {
        $('referral-link').select();
        if (!document.execCommand('copy')) throw new Error('copy not supported');
        $('referral-link').setSelectionRange(0, 0);
      }
      toast('Invitation link copied. It becomes active after deployment.');
    } catch (_) {
      $('referral-link').focus();
      $('referral-link').select();
      toast('Select and copy your invitation link.');
    }
  }
  $('copy-referral').addEventListener('click', copyReferral);
  $('share-referral').addEventListener('click', () => {
    const data = { title: 'Join RAKA First Circle', text: 'A thoughtful new chapter in scalp and hair care. Join RAKA First Circle.', url: $('referral-link').value };
    if (navigator.share) navigator.share(data).catch(() => {});
    else copyReferral();
  });
  $('reset-flow').addEventListener('click', () => {
    form.reset();
    resetErrors();
    $('welcome-view').hidden = true;
    $('form-view').hidden = false;
    $('form-view').scrollIntoView({ behavior: 'smooth', block: 'center' });
    $('email').focus({ preventScroll: true });
  });

  document.querySelectorAll('[data-dialog]').forEach(el => el.addEventListener('click', () => {
    const dialog = $(el.getAttribute('data-dialog'));
    if (!dialog.open) dialog.showModal();
  }));
  $('view-email').addEventListener('click', () => $('email-dialog').showModal());
  document.querySelectorAll('[data-close-dialog]').forEach(el => el.addEventListener('click', () => el.closest('dialog').close()));
  document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  }));
})();
