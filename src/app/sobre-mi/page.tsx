import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Estudiante avanzado de Ingeniería en Sistemas (UTN). Desarrollo full-stack con React, Next.js y Django, y automatización B2B con n8n.",
  alternates: { canonical: "/sobre-mi" },
};

export default function SobreMiPage() {
  return <AboutContent />;
}
