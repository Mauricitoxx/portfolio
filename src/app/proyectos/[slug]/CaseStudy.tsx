'use client';

import Link from 'next/link';
import { ArrowLeft, ExternalLink, FileText, Lock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { Project } from '@/data/projects';
import Reveal from '@/components/ui/Reveal';
import { GithubIcon } from '@/components/ui/BrandIcons';

type IconType = React.ComponentType<{ size?: number; className?: string }>;

export default function CaseStudy({ project }: { project: Project }) {
  const { t, tr } = useLanguage();

  const meta = [
    { label: t.projects.role, value: tr(project.role) },
    { label: t.projects.period, value: tr(project.period) },
    { label: t.projects.context, value: project.context },
  ];

  const linkItems = [
    project.links.live && {
      href: project.links.live,
      label: t.projects.live,
      icon: ExternalLink as IconType,
    },
    project.links.repo && {
      href: project.links.repo,
      label: t.projects.repo,
      icon: GithubIcon as IconType,
    },
    project.links.writeup && {
      href: project.links.writeup,
      label: t.projects.writeup,
      icon: FileText as IconType,
    },
  ].filter(Boolean) as { href: string; label: string; icon: IconType }[];

  return (
    <article className="py-14">
      <Link
        href="/proyectos"
        className="inline-flex items-center gap-2 text-sm text-[var(--color-text-mute)] transition-colors hover:text-[var(--color-text)]"
      >
        <ArrowLeft size={15} aria-hidden="true" />
        {t.projects.back}
      </Link>

      <Reveal className="mt-6">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">
          {project.type === 'web' ? t.projects.typeWeb : t.projects.typeAutomation}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--color-text)] sm:text-4xl text-balance">
          {tr(project.name)}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-[var(--color-text-soft)]">
          {tr(project.summary)}
        </p>
      </Reveal>

      <div className="mt-8 grid gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 p-6 sm:grid-cols-3">
        {meta.map((m) => (
          <div key={m.label}>
            <dt className="font-mono text-[0.68rem] uppercase tracking-wider text-[var(--color-text-mute)]">
              {m.label}
            </dt>
            <dd className="mt-1 text-sm text-[var(--color-text)]">{m.value}</dd>
          </div>
        ))}
      </div>

      {/* TODO Mauro: acá va la captura principal o un video corto del proyecto.
          Guardá las imágenes en /public/proyectos/<slug>/ y descomentá:
          <img src={`/proyectos/${project.slug}/cover.png`} alt="..." className="mt-8 rounded-2xl border border-[var(--color-border)]" />
      */}
      <div className="mt-8 flex aspect-video w-full items-center justify-center rounded-2xl border border-dashed border-[var(--color-border)] bg-white/[0.02] text-sm text-[var(--color-text-mute)]">
        [ TODO: captura o demo en video del proyecto ]
      </div>

      <div className="mt-12 space-y-12">
        <Section title={t.caseStudy.problem}>
          <p>{tr(project.problem)}</p>
        </Section>

        <Section title={t.caseStudy.built}>
          <ul className="list-disc space-y-2 pl-5 marker:text-[var(--color-text-mute)]">
            {tr(project.built).map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </Section>

        <Section title={t.caseStudy.stackLabel}>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-md bg-white/5 px-2.5 py-1 text-sm text-[var(--color-text-soft)]"
              >
                {s}
              </span>
            ))}
          </div>
        </Section>

        <Section title={t.caseStudy.result}>
          <p className="text-[var(--color-text)]">{tr(project.result)}</p>
        </Section>

        <Section title={t.caseStudy.retro}>
          <p>{tr(project.retro)}</p>
        </Section>

        <Section title={t.caseStudy.links}>
          {project.internal && linkItems.length === 0 ? (
            <p className="flex items-center gap-2 text-[var(--color-text-mute)]">
              <Lock size={14} aria-hidden="true" />
              {t.projects.internalNote}
            </p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {linkItems.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/5 px-4 py-2 text-sm text-[var(--color-text)] transition-colors hover:bg-white/10"
                >
                  <span aria-hidden="true"><Icon size={15} /></span>
                  {label}
                </a>
              ))}
              {linkItems.length === 0 && (
                <p className="text-[var(--color-text-mute)]">
                  [ TODO Mauro: completá los links de este proyecto ]
                </p>
              )}
            </div>
          )}
        </Section>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal as="section">
      <h2 className="mb-3 text-lg font-semibold text-[var(--color-text)]">{title}</h2>
      <div className="max-w-2xl leading-relaxed text-[var(--color-text-soft)]">
        {children}
      </div>
    </Reveal>
  );
}
