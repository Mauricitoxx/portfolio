'use client';

import { Briefcase, GraduationCap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { timeline } from '@/data/profile';
import Reveal from '@/components/ui/Reveal';

export default function Timeline() {
  const { tr } = useLanguage();

  return (
    <ol className="relative border-l border-[var(--color-border)] pl-6">
      {timeline.map((entry, i) => {
        const Icon = entry.kind === 'work' ? Briefcase : GraduationCap;
        return (
          <Reveal as="li" key={i} delay={i * 0.05} className="mb-9 last:mb-0">
            <span
              className="absolute -left-[13px] flex h-6 w-6 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-accent)]"
              aria-hidden="true"
            >
              <Icon size={12} />
            </span>
            <p className="font-mono text-xs text-[var(--color-text-mute)]">
              {tr(entry.period)} · {entry.org}
            </p>
            <h3 className="mt-1 font-semibold text-[var(--color-text)]">
              {tr(entry.title)}
            </h3>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-[var(--color-text-soft)]">
              {tr(entry.detail)}
            </p>
          </Reveal>
        );
      })}
    </ol>
  );
}
