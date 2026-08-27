'use client';

import Link from 'next/link';
import { ArrowUpRight, Lock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { Project } from '@/data/projects';

export default function ProjectCard({ project }: { project: Project }) {
  const { t, tr } = useLanguage();
  const typeLabel =
    project.type === 'web' ? t.projects.typeWeb : t.projects.typeAutomation;

  return (
    <Link
      href={`/proyectos/${project.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-6 backdrop-blur-xl transition-colors hover:border-[var(--color-accent)]/50"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full border border-[var(--color-border)] px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-[var(--color-text-mute)]">
          {typeLabel}
        </span>
        <ArrowUpRight
          size={18}
          className="text-[var(--color-text-mute)] transition-colors group-hover:text-[var(--color-accent)]"
          aria-hidden="true"
        />
      </div>

      <h3 className="text-lg font-semibold tracking-tight text-[var(--color-text)]">
        {tr(project.name)}
      </h3>
      <p className="mt-1 font-mono text-xs text-[var(--color-text-mute)]">
        {project.context} · {tr(project.period)}
      </p>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--color-text-soft)]">
        {tr(project.summary)}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[var(--color-border)]/70 pt-4">
        {project.stack.slice(0, 4).map((s) => (
          <span
            key={s}
            className="rounded-md bg-white/5 px-2 py-1 text-[0.7rem] text-[var(--color-text-mute)]"
          >
            {s}
          </span>
        ))}
        {project.internal && (
          <span className="ml-auto flex items-center gap-1 text-[0.7rem] text-[var(--color-text-mute)]">
            <Lock size={11} aria-hidden="true" />
            {t.projects.internalNote}
          </span>
        )}
      </div>
    </Link>
  );
}
