'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

interface FormState {
  name: string;
  email: string;
  service: string;
  message: string;
  budget: string;
}

export default function ContactForm() {
  const t = useTranslations('contact');
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    name: '', email: '', service: '', message: '', budget: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);

    const payload = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '',
      name: form.name,
      email: form.email,
      service: form.service,
      message: form.message,
      budget: form.budget,
    };

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        router.push('/thank-you');
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full bg-[var(--t-surface)] border border-[var(--t-border)] text-[var(--t-text)] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--brand-accent)]';

  return (
    <main className="max-w-lg mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-[var(--t-text)] mb-2">{t('title')}</h1>
      <p className="text-[var(--t-muted)] mb-8">{t('subtitle')}</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="name"
          type="text"
          required
          placeholder={t('namePlaceholder')}
          value={form.name}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="email"
          type="email"
          required
          placeholder={t('emailPlaceholder')}
          value={form.email}
          onChange={handleChange}
          className={inputClass}
        />

        <div>
          <label htmlFor="service" className="sr-only">{t('serviceLabel')}</label>
          <select
            id="service"
            name="service"
            aria-label={t('serviceLabel')}
            value={form.service}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">{t('serviceLabel')}</option>
            <option value="photography">{t('servicePhotography')}</option>
            <option value="marketing">{t('serviceMarketing')}</option>
            <option value="automation">{t('serviceAutomation')}</option>
            <option value="other">{t('serviceOther')}</option>
          </select>
        </div>

        <textarea
          name="message"
          required
          rows={4}
          placeholder={t('messagePlaceholder')}
          value={form.message}
          onChange={handleChange}
          className={inputClass}
        />

        <div>
          <label htmlFor="budget" className="sr-only">{t('budgetLabel')}</label>
          <select
            id="budget"
            name="budget"
            aria-label={t('budgetLabel')}
            value={form.budget}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">{t('budgetLabel')}</option>
            <option value="unknown">{t('budgetUnknown')}</option>
            <option value="under10k">{t('budgetUnder10k')}</option>
            <option value="10k30k">{t('budget10k30k')}</option>
            <option value="over30k">{t('budgetOver30k')}</option>
          </select>
        </div>

        {error && (
          <p className="text-sm text-red-500">{t('errorMessage')}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[var(--brand-primary)] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {submitting ? t('submitting') : t('submitButton')}
        </button>
      </form>
    </main>
  );
}
