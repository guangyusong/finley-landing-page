"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function validateField(name: string, value: string): string | null {
  const v = String(value || '').trim();
  switch (name) {
    case 'firstName':
      if (!v) return 'First name is required';
      if (v.length > 100) return 'First name is too long (max 100)';
      return null;
    case 'lastName':
      if (!v) return 'Last name is required';
      if (v.length > 100) return 'Last name is too long (max 100)';
      return null;
    case 'email':
      if (!v) return 'Email is required';
      if (v.length > 254) return 'Email is too long (max 254)';
      if (!/.+@.+\..+/.test(v)) return 'Enter a valid email address';
      return null;
    case 'phone': {
      if (!v) return 'Phone is required';
      if (v.length > 30) return 'Phone is too long (max 30)';
      const digits = v.replace(/\D/g, '');
      if (digits.length < 10) return 'Enter a valid phone number';
      return null;
    }
    case 'loanAmount':
      if (!v) return 'Please select a loan amount';
      return null;
    case 'message':
      if (v.length > 2000) return 'Message is too long (max 2000)';
      return null;
    default:
      return null;
  }
}

export default function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validateForm(form: HTMLFormElement) {
    const formData = new FormData(form);
    const nextErrors: Record<string, string> = {};
    for (const name of ['firstName', 'lastName', 'email', 'phone', 'loanAmount', 'message']) {
      const err = validateField(name, String(formData.get(name) ?? ''));
      if (err) nextErrors[name] = err;
    }
    setErrors(nextErrors);
    return nextErrors;
  }

  function handleFieldBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.currentTarget;
    const err = validateField(name, value);
    setErrors(prev => {
      const next = { ...prev };
      if (err) next[name] = err; else delete next[name];
      return next;
    });
  }

  function handleFieldInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.currentTarget;
    const err = validateField(name, value);
    setErrors(prev => {
      const next = { ...prev };
      if (err) next[name] = err; else delete next[name];
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const hp = String(formData.get('company') ?? '').trim();
    if (hp) {
      form.reset();
      setErrors({});
      const note = form.querySelector('[data-submit-note]');
      if (note) note.textContent = "Thanks! We'll be in touch shortly.";
      return;
    }

    const fieldErrors = validateForm(form);
    const fieldNames = Object.keys(fieldErrors);
    if (fieldNames.length > 0) {
      const first = fieldNames[0];
      const el = form.querySelector(`[name="${first}"]`) as HTMLElement | null;
      el?.focus();
      const note = form.querySelector('[data-submit-note]');
      if (note) note.textContent = 'Please correct the highlighted fields.';
      return;
    }

    try {
      setIsSubmitting(true);
      (form.querySelector('[type="submit"]') as HTMLButtonElement | null)?.setAttribute('disabled', 'true');
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData.entries())),
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        form.reset();
        setErrors({});
        const note = form.querySelector('[data-submit-note]');
        if (note) note.textContent = "Thanks! We'll be in touch shortly.";
      } else {
        const note = form.querySelector('[data-submit-note]');
        if (note) note.textContent = 'There was a problem sending your request. Please try again.';
      }
    } catch {
      const note = (e.currentTarget as HTMLElement).querySelector('[data-submit-note]');
      if (note) note.textContent = 'There was a problem sending your request. Please try again.';
    } finally {
      (form.querySelector('[type="submit"]') as HTMLButtonElement | null)?.removeAttribute('disabled');
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border-2 border-slate-200">
      <form className="space-y-6" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
        <div className="absolute left-[-10000px] top-auto w-px h-px overflow-hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input type="text" id="company" name="company" autoComplete="organization" tabIndex={-1} />
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              autoComplete="given-name"
              className={`w-full px-4 py-3 rounded-xl border-2 ${errors.firstName ? 'border-red-500 focus:border-red-600' : 'border-slate-200 focus:border-orange-600'} focus:outline-none transition-colors`}
              maxLength={100}
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={errors.firstName ? 'firstName-error' : undefined}
              onBlur={handleFieldBlur}
              onChange={handleFieldInput}
              required
            />
            {errors.firstName && (<p id="firstName-error" className="mt-2 text-sm text-red-600" role="alert">{errors.firstName}</p>)}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              autoComplete="family-name"
              className={`w-full px-4 py-3 rounded-xl border-2 ${errors.lastName ? 'border-red-500 focus:border-red-600' : 'border-slate-200 focus:border-orange-600'} focus:outline-none transition-colors`}
              maxLength={100}
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby={errors.lastName ? 'lastName-error' : undefined}
              onBlur={handleFieldBlur}
              onChange={handleFieldInput}
              required
            />
            {errors.lastName && (<p id="lastName-error" className="mt-2 text-sm text-red-600" role="alert">{errors.lastName}</p>)}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            className={`w-full px-4 py-3 rounded-xl border-2 ${errors.email ? 'border-red-500 focus:border-red-600' : 'border-slate-200 focus:border-orange-600'} focus:outline-none transition-colors`}
            maxLength={254}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            onBlur={handleFieldBlur}
            onChange={handleFieldInput}
            required
          />
          {errors.email && (<p id="email-error" className="mt-2 text-sm text-red-600" role="alert">{errors.email}</p>)}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            className={`w-full px-4 py-3 rounded-xl border-2 ${errors.phone ? 'border-red-500 focus:border-red-600' : 'border-slate-200 focus:border-orange-600'} focus:outline-none transition-colors`}
            maxLength={30}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            onBlur={handleFieldBlur}
            onChange={handleFieldInput}
            required
          />
          {errors.phone && (<p id="phone-error" className="mt-2 text-sm text-red-600" role="alert">{errors.phone}</p>)}
        </div>

        <div>
          <label htmlFor="loanAmount" className="block text-sm font-semibold text-slate-700 mb-2">Estimated Loan Amount</label>
          <select
            id="loanAmount"
            name="loanAmount"
            className={`w-full px-4 py-3 rounded-xl border-2 ${errors.loanAmount ? 'border-red-500 focus:border-red-600' : 'border-slate-200 focus:border-orange-600'} focus:outline-none transition-colors`}
            aria-invalid={Boolean(errors.loanAmount)}
            aria-describedby={errors.loanAmount ? 'loanAmount-error' : undefined}
            onBlur={handleFieldBlur}
            onChange={handleFieldInput}
            required
          >
            <option value="">Select amount...</option>
            <option value="under-200k">Under $200,000</option>
            <option value="200k-400k">$200,000 - $400,000</option>
            <option value="400k-600k">$400,000 - $600,000</option>
            <option value="600k-800k">$600,000 - $800,000</option>
            <option value="over-800k">Over $800,000</option>
          </select>
          {errors.loanAmount && (<p id="loanAmount-error" className="mt-2 text-sm text-red-600" role="alert">{errors.loanAmount}</p>)}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Additional Information (Optional)</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-orange-600 focus:outline-none transition-colors resize-none"
            maxLength={2000}
            onBlur={handleFieldBlur}
            onChange={handleFieldInput}
          ></textarea>
        </div>

        <button
          type="submit"
          aria-disabled={isSubmitting}
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-full font-bold text-lg hover:shadow-xl hover:shadow-orange-600/25 hover:scale-105 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting…' : 'Submit Application'}
        </button>

        <p className="text-sm text-slate-500 text-center" aria-live="polite" data-submit-note>
          By submitting this form, you agree to our{' '}
          <Link href="/privacy-policy" className="text-orange-600 hover:underline">Privacy Policy</Link> and{' '}
          <Link href="/terms" className="text-orange-600 hover:underline">Terms and Conditions</Link>
        </p>
      </form>
    </div>
  );
}

