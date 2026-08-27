import type { Localized } from "@/lib/site";

export type ProjectType = "web" | "automation";

export type Project = {
  slug: string;
  featured: boolean;
  type: ProjectType;
  /** interno = sin demo pública; se muestra aviso en lugar del link "live" */
  internal: boolean;
  name: Localized;
  summary: Localized;
  role: Localized;
  period: Localized;
  context: string;
  stack: string[];
  problem: Localized;
  built: Localized<string[]>;
  result: Localized;
  retro: Localized;
  links: {
    live: string | null;
    repo: string | null;
    writeup: string | null;
  };
};

/**
 * TODO Mauro — antes de publicar:
 *  1. Completá los links (live / repo) que están en null.
 *  2. En cada "result", agregá la línea base y el método de medición
 *     (ej: "de ~5 h/semana entre 3 personas a ~1,5 h, medido dic-2025 a feb-2026").
 *  3. Reescribí "retro" con una reflexión real y honesta (1 párrafo).
 *  4. Agregá 2–3 capturas por proyecto en /public/proyectos/<slug>/ y
 *     enchufalas en la plantilla de caso de estudio.
 */
export const projects: Project[] = [
  {
    slug: "sistema-reposicion-stock",
    featured: true,
    type: "automation",
    internal: true,
    name: {
      es: "Sistema de reposición automática de inventario",
      en: "Automated inventory restock system",
    },
    summary: {
      es: "Motor de decisión que analiza disponibilidad, precios y plazos de proveedores y genera los pedidos de reposición solo.",
      en: "Decision engine that analyzes supplier availability, pricing and lead times and generates restock orders on its own.",
    },
    role: { es: "Desarrollador de automatización", en: "Automation developer" },
    period: { es: "dic. 2025 – feb. 2026", en: "Dec 2025 – Feb 2026" },
    context: "Eliggi Repuestos C.A",
    stack: ["n8n", "APIs REST", "Webhooks", "PostgreSQL", "Lógica de decisión"],
    problem: {
      es: "La planificación de reposición era 100% manual: revisar stock, cruzar precios y plazos de varios proveedores y decidir a mano cuánto pedir y a quién. Lento, inconsistente y difícil de escalar.",
      en: "Restock planning was fully manual: check stock, cross-reference prices and lead times across several suppliers, and decide by hand how much to order and from whom. Slow, inconsistent and hard to scale.",
    },
    built: {
      es: [
        "Lógica de decisión que determina cuándo reponer, qué cantidad y a qué proveedor según disponibilidad, precio y tiempo de entrega.",
        "Consulta automatizada de stock y precios de proveedores en tiempo real.",
        "Generación automática de las órdenes de pedido.",
        "Orquestación en n8n con webhooks e integraciones vía API.",
      ],
      en: [
        "Decision logic that determines when to restock, how much, and from which supplier based on availability, price and lead time.",
        "Automated real-time queries of supplier stock and pricing.",
        "Automatic generation of purchase orders.",
        "Orchestration in n8n with webhooks and API integrations.",
      ],
    },
    result: {
      es: "Reducción de ~70% en el tiempo de reposición de stock. [TODO Mauro: agregá línea base y método — ej: de ~5 h/semana entre 3 personas a ~1,5 h, medido dic. 2025 – feb. 2026.]",
      en: "~70% reduction in restock time. [TODO Mauro: add baseline and method — e.g. from ~5 h/week across 3 people to ~1.5 h, measured Dec 2025 – Feb 2026.]",
    },
    retro: {
      es: "[TODO Mauro: 1 párrafo honesto. Ej: qué parte de la lógica quedó frágil, qué monitoreo le falta, qué automatizarías distinto hoy.]",
      en: "[TODO Mauro: one honest paragraph. E.g. which part of the logic is still fragile, what monitoring is missing, what you'd automate differently today.]",
    },
    links: { live: null, repo: null, writeup: null },
  },
  {
    slug: "suchus-copy-design",
    featured: true,
    type: "web",
    internal: false,
    name: { es: "Suchus Copy & Design", en: "Suchus Copy & Design" },
    summary: {
      es: "Plataforma web de servicios de impresión y papelería, con UI en React y un chatbot de IA para cotización automática.",
      en: "Web platform for printing and stationery services, with a React UI and an AI chatbot for automated quoting.",
    },
    role: { es: "Desarrollador Frontend", en: "Frontend developer" },
    period: { es: "abr. 2025 – feb. 2026", en: "Apr 2025 – Feb 2026" },
    context: "Suchus Copy & Design C.A",
    stack: ["React", "Next.js", "Chatbot IA", "Tailwind CSS"],
    problem: {
      es: "Los pedidos y cotizaciones se gestionaban manualmente por chat: tiempos de respuesta altos y sin trazabilidad del estado de cada pedido.",
      en: "Orders and quotes were handled manually over chat: slow responses and no traceability of each order's status.",
    },
    built: {
      es: [
        "UI responsiva en React para la gestión de servicios técnicos (impresión, escaneo, encuadernación).",
        "Chatbot de IA para cotización automática y consulta de estado de pedidos.",
        "Preclasificación de solicitudes por chat para bajar el tiempo de atención manual.",
      ],
      en: [
        "Responsive React UI for managing technical services (printing, scanning, binding).",
        "AI chatbot for automated quoting and order-status lookups.",
        "Chat-based request pre-classification to reduce manual handling time.",
      ],
    },
    result: {
      es: "Reducción significativa del tiempo de respuesta manual gracias a la preclasificación por chat. [TODO Mauro: poné un número concreto y cómo lo medís.]",
      en: "Significant reduction in manual response time thanks to chat pre-classification. [TODO Mauro: add a concrete number and how you measure it.]",
    },
    retro: {
      es: "[TODO Mauro: 1 párrafo honesto sobre qué mejorarías del chatbot o de la arquitectura.]",
      en: "[TODO Mauro: one honest paragraph on what you'd improve in the chatbot or the architecture.]",
    },
    links: {
      live: null, // TODO Mauro: URL de la demo en vivo
      repo: "https://github.com/Mauricitoxx/Suchus-Design",
      writeup: null,
    },
  },
  {
    slug: "jf-tecnologias-dashboard",
    featured: true,
    type: "web",
    internal: false,
    name: {
      es: "Jf-Tecnologías — Panel de administración",
      en: "Jf-Tecnologías — Admin dashboard",
    },
    summary: {
      es: "Panel administrativo con edición de artículos, carga múltiple de imágenes con Cloudinary y filtrado avanzado de inventario.",
      en: "Admin panel with item editing, multi-image upload via Cloudinary and advanced inventory filtering.",
    },
    role: { es: "Desarrollador Full-Stack", en: "Full-stack developer" },
    period: { es: "[TODO: fechas]", en: "[TODO: dates]" },
    context: "Jf-Tecnologías",
    stack: ["React", "Node.js", "Cloudinary", "MongoDB"],
    problem: {
      es: "No existía una herramienta interna para gestionar el catálogo y el inventario: cada cambio era lento y dependía de terceros.",
      en: "There was no internal tool to manage the catalog and inventory: every change was slow and depended on third parties.",
    },
    built: {
      es: [
        "CRUD completo de artículos con validación.",
        "Carga múltiple de imágenes integrada con Cloudinary.",
        "Filtrado avanzado de inventario.",
        "Sistema de autenticación para el panel.",
      ],
      en: [
        "Full item CRUD with validation.",
        "Multi-image upload integrated with Cloudinary.",
        "Advanced inventory filtering.",
        "Authentication system for the panel.",
      ],
    },
    result: {
      es: "[TODO Mauro: qué mejoró concretamente para el equipo y cómo lo medís.]",
      en: "[TODO Mauro: what concretely improved for the team and how you measure it.]",
    },
    retro: {
      es: "[TODO Mauro: 1 párrafo honesto — ej. estado del testing, deuda técnica, qué rehacerías.]",
      en: "[TODO Mauro: one honest paragraph — e.g. test coverage, tech debt, what you'd rebuild.]",
    },
    links: {
      live: "https://jf-tecnologias.com",
      repo: null, // TODO Mauro: URL del repo
      writeup: null,
    },
  },
  {
    slug: "bot-consultas-urgentes",
    featured: false,
    type: "automation",
    internal: true,
    name: {
      es: "Bot de consulta de productos urgentes",
      en: "Urgent product queries bot",
    },
    summary: {
      es: "Agente interno de IA para ventas: consulta disponibilidad y precios con proveedores cuando no hay stock interno.",
      en: "Internal AI agent for sales: checks supplier availability and pricing when internal stock is depleted.",
    },
    role: { es: "Desarrollador de automatización", en: "Automation developer" },
    period: { es: "ago. 2025 – dic. 2025", en: "Aug 2025 – Dec 2025" },
    context: "Eliggi Repuestos C.A",
    stack: ["n8n", "IA / LLM", "Webhooks", "APIs REST"],
    problem: {
      es: "Cuando no había stock interno, el vendedor perdía la venta o tardaba horas en confirmar disponibilidad con los proveedores.",
      en: "When internal stock ran out, the salesperson lost the sale or spent hours confirming availability with suppliers.",
    },
    built: {
      es: [
        "Agente de IA en n8n que interpreta la consulta del vendedor.",
        "Consulta automatizada de disponibilidad y precio a proveedores.",
        "Respuesta al vendedor en el canal interno, en tiempo real.",
      ],
      en: [
        "AI agent in n8n that parses the salesperson's query.",
        "Automated availability and price checks against suppliers.",
        "Real-time reply to the salesperson in the internal channel.",
      ],
    },
    result: {
      es: "Reducción de ~40% en el tiempo de respuesta a clientes. [TODO Mauro: línea base y método de medición.]",
      en: "~40% reduction in customer response time. [TODO Mauro: baseline and measurement method.]",
    },
    retro: {
      es: "[TODO Mauro: 1 párrafo honesto sobre límites del agente o falsos positivos.]",
      en: "[TODO Mauro: one honest paragraph on the agent's limits or false positives.]",
    },
    links: { live: null, repo: null, writeup: null },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
