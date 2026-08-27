'use client';

import { Mail, FileDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { CONTACT } from '@/lib/site';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const items = [
    { href: `mailto:${CONTACT.email}`, label: 'Email', icon: Mail, external: false },
    { href: CONTACT.linkedin, label: 'LinkedIn', icon: LinkedinIcon, external: true },
    { href: CONTACT.github, label: 'GitHub', icon: GithubIcon, external: true },
    { href: CONTACT.cv, label: t.nav.cv, icon: FileDown, external: true },
  ];

  return (
    <footer className="mt-24 border-t border-[var(--color-border)]/60">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-x-5 gap-y-3">
          {items.map(({ href, label, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex items-center gap-2 text-sm text-[var(--color-text-mute)] transition-colors hover:text-[var(--color-text)]"
            >
              <Icon size={15} aria-hidden="true" />
              {label}
            </a>
          ))}
        </div>

        <div className="text-xs text-[var(--color-text-mute)]">
          <p>
            © {year} Mauro Lista. {t.footer.rights}
          </p>
          <p className="mt-1">
            {t.footer.builtWith}{' '}
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-[var(--color-text)]"
            >
              {t.footer.source}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
