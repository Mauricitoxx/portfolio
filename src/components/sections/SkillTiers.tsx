'use client';

import { useLanguage } from '@/context/LanguageContext';
import { skillTiers, languages } from '@/data/profile';
import Reveal from '@/components/ui/Reveal';

export default function SkillTiers() {
  const { t, tr } = useLanguage();

  const tierLabel: Record<string, string> = {
    using: t.about.tierUsing,
    comfortable: t.about.tierComfortable,
    learning: t.about.tierLearning,
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {skillTiers.map((group, i) => (
          <Reveal
            key={group.tier}
            delay={i * 0.06}
            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-5"
          >
            <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">
              {tierLabel[group.tier]}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((s) => (
                <span
                  key={s}
                  className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-[var(--color-text-soft)]"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-[var(--color-text)]">
          {t.about.languagesTitle}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {languages.map((lng) => (
            <div
              key={tr(lng.name)}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-5"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-medium text-[var(--color-text)]">
                  {tr(lng.name)}
                </span>
                <span className="text-xs text-[var(--color-text-mute)]">
                  {tr(lng.level)}
                </span>
              </div>
              <div
                className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5"
                role="presentation"
              >
                <div
                  className="h-full rounded-full bg-[var(--color-accent)]"
                  style={{ width: `${lng.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
