'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { featuredProjects } from '@/data/projects';
import ProjectCard from '@/components/ui/ProjectCard';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';

export default function FeaturedProjects() {
  const { t } = useLanguage();

  return (
    <section className="py-14">
      <SectionHeading eyebrow="01" title={t.home.featuredTitle}>
        {t.home.featuredSubtitle}
      </SectionHeading>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/proyectos"
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] hover:underline underline-offset-4"
        >
          {t.home.seeAll}
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
