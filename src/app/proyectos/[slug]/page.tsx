import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/data/projects";
import CaseStudy from "./CaseStudy";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  props: PageProps<"/proyectos/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name.es,
    description: project.summary.es,
    alternates: { canonical: `/proyectos/${project.slug}` },
    openGraph: {
      title: `${project.name.es} · Mauro Lista`,
      description: project.summary.es,
      url: `/proyectos/${project.slug}`,
    },
  };
}

export default async function ProjectPage(props: PageProps<"/proyectos/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();
  return <CaseStudy project={project} />;
}
