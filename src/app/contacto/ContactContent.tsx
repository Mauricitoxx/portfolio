'use client';

import { useState, type FormEvent } from 'react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { CONTACT } from '@/lib/site';
import SectionHeading from '@/components/ui/SectionHeading';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactContent() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('bad response');
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  const channels = [
    { href: `mailto:${CONTACT.email}`, label: CONTACT.email, icon: Mail, ext: false },
    { href: CONTACT.linkedin, label: 'LinkedIn', icon: LinkedinIcon, ext: true },
    { href: CONTACT.github, label: 'GitHub · @Mauricitoxx', icon: GithubIcon, ext: true },
  ];

  return (
    <div className="py-14">
      <SectionHeading eyebrow={t.nav.contact} title={t.contact.title}>
        {t.contact.subtitle}
      </SectionHeading>

      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-medium text-[var(--color-text-mute)]">
            {t.contact.orReach}
          </p>
          <ul className="space-y-3">
            {channels.map(({ href, label, icon: Icon, ext }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex items-center gap-3 text-[var(--color-text-soft)] transition-colors hover:text-[var(--color-text)]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-white/5 text-[var(--color-accent)]">
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {status === 'sent' ? (
            <p className="flex items-center gap-2 rounded-xl border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 p-4 text-sm text-[var(--color-text)]">
              <CheckCircle2 size={18} aria-hidden="true" />
              {t.contact.sent}
            </p>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <Field name="name" label={t.contact.nameLabel} required />
              <Field name="email" label={t.contact.emailLabel} type="email" required />
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm text-[var(--color-text-soft)]"
                >
                  {t.contact.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] placeholder-[var(--color-text-mute)] focus:border-[var(--color-accent)] focus:outline-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-sm text-[#ff8a80]">
                  {t.contact.error}{' '}
                  <a href={`mailto:${CONTACT.email}`} className="underline">
                    {CONTACT.email}
                  </a>
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent-strong)] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent)] disabled:opacity-60"
              >
                <Send size={15} aria-hidden="true" />
                {status === 'sending' ? t.contact.sending : t.contact.send}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  type = 'text',
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm text-[var(--color-text-soft)]">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] placeholder-[var(--color-text-mute)] focus:border-[var(--color-accent)] focus:outline-none"
      />
    </div>
  );
}
