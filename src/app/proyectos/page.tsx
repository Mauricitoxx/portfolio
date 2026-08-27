import type { Metadata } from "next";
import ProjectsList from "./ProjectsList";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Casos de estudio: aplicaciones web full-stack y automatización de procesos B2B, con el problema, el stack y el resultado medido de cada uno.",
  alternates: { canonical: "/proyectos" },
};

export default function ProyectosPage() {
  return <ProjectsList />;
}
