import type { Localized } from "@/lib/site";

export type TimelineEntry = {
  kind: "work" | "education";
  title: Localized;
  org: string;
  period: Localized;
  detail: Localized;
};

/**
 * Trayectoria — SOLO cosas hechas o en curso, con fechas reales.
 * Nada de fechas futuras presentadas como logro.
 * Orden: de más reciente a más antiguo.
 */
export const timeline: TimelineEntry[] = [
  {
    kind: "education",
    title: {
      es: "Analista en Sistemas (título intermedio)",
      en: "Systems Analyst (intermediate degree)",
    },
    org: "Universidad Tecnológica Nacional (UTN)",
    period: { es: "Título esperado: ago. 2026", en: "Expected: Aug 2026" },
    detail: {
      es: "Titulación intermedia de la carrera: análisis de sistemas, lógica de negocio y diseño de bases de datos.",
      en: "Intermediate degree: systems analysis, business logic and database design.",
    },
  },
  {
    kind: "work",
    title: {
      es: "Sistema de reposición automática de inventario",
      en: "Automated inventory restock system",
    },
    org: "Eliggi Repuestos C.A",
    period: { es: "dic. 2025 – feb. 2026", en: "Dec 2025 – Feb 2026" },
    detail: {
      es: "Motor de decisión + integraciones con proveedores en n8n. Redujo ~70% el tiempo de reposición.",
      en: "Decision engine + supplier integrations in n8n. Cut restock time by ~70%.",
    },
  },
  {
    kind: "work",
    title: {
      es: "Bot de consulta de productos urgentes",
      en: "Urgent product queries bot",
    },
    org: "Eliggi Repuestos C.A",
    period: { es: "ago. 2025 – dic. 2025", en: "Aug 2025 – Dec 2025" },
    detail: {
      es: "Agente interno de IA (n8n) para el equipo de ventas. Redujo ~40% el tiempo de respuesta a clientes.",
      en: "Internal AI agent (n8n) for the sales team. Cut customer response time by ~40%.",
    },
  },
  {
    kind: "work",
    title: {
      es: "Plataforma de servicios de impresión",
      en: "Printing services platform",
    },
    org: "Suchus Copy & Design C.A",
    period: { es: "abr. 2025 – feb. 2026", en: "Apr 2025 – Feb 2026" },
    detail: {
      es: "UI en React para gestión de servicios y un chatbot de IA para cotización automática.",
      en: "React UI for service management and an AI chatbot for automated quoting.",
    },
  },
  {
    kind: "education",
    title: {
      es: "Especialización en Automatización",
      en: "Automation specialization",
    },
    org: "Certificación",
    period: { es: "2024 – 2026", en: "2024 – 2026" },
    detail: {
      es: "Formación complementaria en automatización de procesos e integración de sistemas.",
      en: "Complementary training in process automation and system integration.",
    },
  },
  {
    kind: "education",
    title: {
      es: "Ingeniería en Sistemas de Información",
      en: "Information Systems Engineering",
    },
    org: "Universidad Tecnológica Nacional (UTN)",
    period: { es: "2022 – en curso", en: "2022 – in progress" },
    detail: {
      es: "Bases en algoritmos, estructuras de datos, paradigmas de programación y arquitectura de software.",
      en: "Foundations in algorithms, data structures, programming paradigms and software architecture.",
    },
  },
];

/**
 * Skills en 3 niveles honestos.
 * TODO Mauro: ajustá según lo que realmente puedas defender en una entrevista.
 * Regla: si está en "Trabajo con esto", debería aparecer en algún proyecto.
 */
export const skillTiers: { tier: "using" | "comfortable" | "learning"; items: string[] }[] = [
  {
    tier: "using",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "n8n",
      "Python",
      "Django",
      "PostgreSQL",
      "REST APIs",
      "Tailwind CSS",
      "Git",
    ],
  },
  {
    tier: "comfortable",
    items: [
      "Node.js",
      "FastAPI",
      "MongoDB",
      "Docker",
      "Cloudinary",
      "SQL Server",
      "Webhooks",
      "Diseño responsivo",
    ],
  },
  {
    tier: "learning",
    items: ["Angular", ".NET", "React Native / Kotlin", "AWS", "Azure", "GraphQL"],
  },
];

export const languages: { name: Localized; level: Localized; pct: number }[] = [
  {
    name: { es: "Español", en: "Spanish" },
    level: { es: "Nativo", en: "Native" },
    pct: 100,
  },
  {
    name: { es: "Inglés", en: "English" },
    level: {
      es: "Intermedio / técnico — lectura de documentación y escritura de código",
      en: "Intermediate / technical — reading docs and writing code",
    },
    pct: 60,
  },
];
