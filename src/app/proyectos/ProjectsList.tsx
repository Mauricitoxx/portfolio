'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { projects, type ProjectType } from '@/data/projects';
import ProjectCard from '@/components/ui/ProjectCard';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';

type Filter = 'all' | ProjectType;

export default function ProjectsList() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>('all');

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: t.projects.filterAll },
    { id: 'web', label: t.projects.filterWeb },
    { id: 'automation', label: t.projects.filterAutomation },
  ];

  const visible = projects.filter((p) => filter === 'all' || p.type === filter);

  return (
    <div className="py-14">
      <SectionHeading eyebrow={t.nav.projects} title={t.projects.title}>
        {t.projects.subtitle}
      </SectionHeading>

      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              filter === f.id
                ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                : 'border-[var(--color-border)] text-[var(--color-text-mute)] hover:text-[var(--color-text)]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.06} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
