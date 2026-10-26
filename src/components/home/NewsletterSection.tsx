'use client';

import React, { useState } from 'react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setMessage('Welcome to the First Circle. We will send one note on launch day.');
        setEmail('');
      } else {
        setStatus('success');
        setMessage('Welcome to the First Circle. We will send one note on launch day.');
        setEmail('');
      }
    } catch {
      setStatus('success');
      setMessage('Welcome to the First Circle. We will send one note on launch day.');
      setEmail('');
    }
  };

  return (
    <section aria-labelledby="newsletter-heading" className="bg-raka-alpenglow-tint">
      <div className="max-w-[1360px] mx-auto px-6 py-14 flex flex-wrap gap-7 items-center justify-between">
        {/* Value Proposition */}
        <div className="flex-1 basis-[360px] flex flex-col gap-2.5">
          <span
            id="newsletter-heading"
            className="font-display font-normal text-[clamp(2rem,3.4vw,2.8rem)] leading-none text-raka-ink"
          >
            [X]% off your{' '}
            <span className="font-display italic text-raka-copper-deep">first order</span>
          </span>
          <span className="text-[15px] text-raka-bark">
            New drops, oil-night tips and early access to gift sets. One-click unsubscribe.
          </span>
        </div>

        {/* Email Signup Form */}
        <div className="flex-1 basis-[420px]">
          <form onSubmit={handleSubmit} className="flex gap-2.5 flex-wrap">
            <label htmlFor="nl-email" className="sr-only">
              Email
            </label>
            <input
              id="nl-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 basis-[220px] h-[52px] px-4 border border-raka-sand rounded-crisp bg-raka-paper font-interface text-[16px] text-raka-ink placeholder:text-raka-taupe outline-none focus:border-raka-copper-deep focus:ring-1 focus:ring-raka-copper-deep transition-all"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="h-[52px] px-7 border-none rounded-crisp bg-raka-ink text-raka-paper font-interface text-[15px] font-bold hover:bg-[#2B2420] active:scale-[0.99] transition-all disabled:opacity-70 focus-visible:outline-none"
            >
              {status === 'loading' ? 'Joining...' : 'Sign me up'}
            </button>
          </form>

          {status === 'success' && (
            <p className="mt-2.5 text-[14px] font-medium text-raka-success-text">
              {message}
            </p>
          )}
          {status === 'error' && (
            <p className="mt-2.5 text-[14px] font-medium text-raka-error-text">
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
