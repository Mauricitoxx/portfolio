'use client';

import { useLanguage } from '@/context/LanguageContext';
import SectionHeading from '@/components/ui/SectionHeading';
import Timeline from '@/components/sections/Timeline';
import SkillTiers from '@/components/sections/SkillTiers';
import Reveal from '@/components/ui/Reveal';

export default function AboutContent() {
  const { t } = useLanguage();

  return (
    <div className="py-14">
      <SectionHeading eyebrow={t.nav.about} title={t.about.title}>
        {t.about.subtitle}
      </SectionHeading>

      <Reveal className="max-w-2xl space-y-4 text-[var(--color-text-soft)] leading-relaxed">
        {t.about.bio.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </Reveal>

      <div className="mt-16">
        <h2 className="mb-8 text-xl font-semibold text-[var(--color-text)]">
          {t.about.timelineTitle}
        </h2>
        <Timeline />
      </div>

      <div className="mt-16">
        <h2 className="mb-2 text-xl font-semibold text-[var(--color-text)]">
          {t.about.skillsTitle}
        </h2>
        <p className="mb-6 max-w-2xl text-sm text-[var(--color-text-mute)]">
          {t.about.skillsNote}
        </p>
        <SkillTiers />
      </div>
    </div>
  );
}
