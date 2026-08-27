'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, Menu, X, FileDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { CONTACT } from '@/lib/site';

export default function Nav() {
  const { t, language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/', label: t.nav.home },
    { href: '/proyectos', label: t.nav.projects },
    { href: '/sobre-mi', label: t.nav.about },
    { href: '/contacto', label: t.nav.contact },
  ];

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)]/60 bg-[var(--color-bg)]/80 backdrop-blur-xl">
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-[var(--color-text)]"
        >
          Mauro&nbsp;Lista
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? 'page' : undefined}
              className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                isActive(l.href)
                  ? 'bg-white/10 text-[var(--color-text)]'
                  : 'text-[var(--color-text-mute)] hover:text-[var(--color-text)] hover:bg-white/5'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={CONTACT.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/5 px-3.5 py-2 text-sm text-[var(--color-text-soft)] transition-colors hover:bg-white/10 hover:text-[var(--color-text)] sm:flex"
          >
            <FileDown size={15} aria-hidden="true" />
            {t.nav.cv}
          </a>

          <button
            type="button"
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-white/5 px-3 py-2 text-sm text-[var(--color-text-soft)] transition-colors hover:bg-white/10 hover:text-[var(--color-text)]"
            aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a español'}
          >
            <Globe size={15} aria-hidden="true" />
            {language.toUpperCase()}
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white/5 p-2 text-[var(--color-text-soft)] md:hidden"
            aria-label={t.nav.menu}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-[var(--color-border)]/60 bg-[var(--color-bg)] md:hidden">
          <div className="container-page flex flex-col py-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(l.href) ? 'page' : undefined}
                className={`rounded-lg px-3 py-3 text-sm ${
                  isActive(l.href)
                    ? 'bg-white/10 text-[var(--color-text)]'
                    : 'text-[var(--color-text-mute)]'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={CONTACT.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-3 py-3 text-sm text-[var(--color-text-mute)]"
            >
              {t.nav.cv}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
