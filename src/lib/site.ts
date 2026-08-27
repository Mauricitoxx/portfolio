/**
 * Configuración central del sitio.
 * TODO Mauro: cambiá SITE_URL por tu dominio propio cuando lo compres
 * (p. ej. https://maurolista.dev). Evitá dejar un *.vercel.app en producción.
 */
export const SITE_URL = "https://maurolista.dev";

export const SITE = {
  name: "Mauro Lista",
  shortName: "Mauro Lista",
  role: {
    es: "Desarrollador Full-Stack Jr. / Automatización",
    en: "Junior Full-Stack / Automation Developer",
  },
  location: {
    es: "La Plata, Buenos Aires, Argentina",
    en: "La Plata, Buenos Aires, Argentina",
  },
  availability: {
    es: "Disponible para trabajar — remoto o La Plata / Buenos Aires",
    en: "Open to work — remote or La Plata / Buenos Aires",
  },
  description: {
    es: "Portfolio de Mauro Lista. Desarrollo full-stack y automatización de procesos B2B con React, Next.js, Django y n8n. Proyectos con impacto medible.",
    en: "Portfolio of Mauro Lista. Full-stack development and B2B process automation with React, Next.js, Django and n8n. Projects with measurable impact.",
  },
} as const;

/**
 * Enlaces de contacto.
 * TODO Mauro: completá LINKEDIN con la URL real de tu perfil.
 * El WhatsApp quedó desactivado a propósito para no publicar tu número
 * de teléfono en el código fuente (se scrapea). Si querés volver a
 * activarlo, poné la URL y renderízalo donde corresponda.
 */
export const CONTACT = {
  email: "maurolista16@gmail.com",
  github: "https://github.com/Mauricitoxx",
  linkedin: "https://www.linkedin.com/in/TODO-completar-perfil",
  cv: "/CV_Mauro_Lista.pdf",
  whatsapp: null as string | null,
} as const;

export type Lang = "es" | "en";
export type Localized<T = string> = { es: T; en: T };
