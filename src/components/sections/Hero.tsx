'use client';

import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { SITE, CONTACT } from '@/lib/site';
import TerminalCard from './TerminalCard';
import Reveal from '@/components/ui/Reveal';

export default function Hero() {
  const { t, tr } = useLanguage();

  return (
    <section className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-3 py-1 text-xs font-medium text-[var(--color-accent)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
            {t.misc.openToWork}
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-6 text-[var(--color-text-mute)]">{t.home.greeting}</p>
          <h1 className="mt-1 text-4xl font-semibold tracking-tight text-[var(--color-text)] sm:text-6xl text-balance">
            {SITE.name}
          </h1>
          <p className="mt-3 text-lg font-medium text-[var(--color-accent)] sm:text-xl">
            {tr(SITE.role)}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-text-soft)]">
            {t.home.pitch}
          </p>
          <p className="mt-3 max-w-xl text-sm text-[var(--color-text-mute)]">
            {tr(SITE.availability)}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/proyectos"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent-strong)] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent)]"
            >
              {t.home.viewProjects}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/5 px-5 py-3 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-white/10"
            >
              <Mail size={16} aria-hidden="true" />
              {t.home.contactMe}
            </a>
          </div>
        </Reveal>
      </div>

      <div className="lg:col-span-5">
        <Reveal delay={0.2}>
          <TerminalCard />
        </Reveal>
      </div>
    </section>
  );
}
