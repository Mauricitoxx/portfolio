/**
 * Diccionario de strings de UI (ES / EN).
 * El contenido de proyectos y trayectoria vive en src/data/*.
 * Regla: si agregás una clave, completá los DOS idiomas. Nada a medias.
 */
export const dictionary = {
  es: {
    nav: {
      home: "Inicio",
      projects: "Proyectos",
      about: "Sobre mí",
      contact: "Contacto",
      cv: "Descargar CV",
      skipToContent: "Saltar al contenido",
      menu: "Menú",
    },
    home: {
      greeting: "Hola, soy",
      pitch:
        "Diseño y desarrollo sistemas end-to-end con foco en automatización y eficiencia. Backend, frontend y workflows funcionando como uno.",
      now: "Ahora: cursando Ingeniería en Sistemas (UTN) y construyendo automatizaciones B2B con n8n.",
      viewProjects: "Ver proyectos",
      contactMe: "Contactar",
      featuredTitle: "Proyectos destacados",
      featuredSubtitle:
        "Tres casos donde apliqué ingeniería de software para resolver un problema concreto de negocio.",
      seeAll: "Ver todos los proyectos",
    },
    projects: {
      title: "Proyectos",
      subtitle:
        "Cada proyecto es un caso: el problema, qué construí, con qué stack y qué resultado se midió.",
      filterAll: "Todos",
      filterWeb: "Aplicaciones web",
      filterAutomation: "Automatización",
      typeWeb: "Aplicación web",
      typeAutomation: "Automatización",
      internalNote: "Proyecto interno — sin demo pública",
      live: "Demo en vivo",
      repo: "Código",
      writeup: "Artículo",
      role: "Rol",
      period: "Período",
      context: "Contexto",
      stack: "Stack",
      back: "Volver a proyectos",
    },
    caseStudy: {
      problem: "El problema",
      built: "Qué construí",
      stackLabel: "Stack",
      result: "Resultado",
      links: "Enlaces",
      retro: "Qué haría distinto",
    },
    about: {
      title: "Sobre mí",
      subtitle:
        "Combino fundamentos de ingeniería con experiencia real construyendo y automatizando software.",
      bio: [
        "Soy estudiante avanzado de Ingeniería en Sistemas (UTN), próximo a recibirme de Analista en Sistemas.",
        "Trabajo sobre todo en dos frentes: aplicaciones web full-stack con React / Next.js / Django, y automatización de procesos B2B con n8n e integraciones con IA.",
        "Me interesa el punto donde la lógica de negocio se encuentra con la interfaz: entender el proceso, medirlo y dejarlo funcionando solo.",
      ],
      timelineTitle: "Trayectoria",
      skillsTitle: "Stack por nivel de uso",
      skillsNote:
        "Agrupado con honestidad: lo que uso en trabajo real, lo que manejo con comodidad y lo que estoy aprendiendo.",
      languagesTitle: "Idiomas",
      tierUsing: "Trabajo con esto",
      tierComfortable: "Me manejo con comodidad",
      tierLearning: "Estoy aprendiendo",
    },
    contact: {
      title: "Contacto",
      subtitle:
        "La mejor forma de llegar a mí es por email o LinkedIn. Suelo responder en 24–48 h.",
      nameLabel: "Nombre",
      emailLabel: "Email",
      messageLabel: "Mensaje",
      send: "Enviar mensaje",
      sending: "Enviando…",
      sent: "¡Gracias! Te respondo pronto.",
      error: "No se pudo enviar. Escribime directamente a",
      orReach: "O directamente:",
      required: "Este campo es obligatorio",
      invalidEmail: "Email no válido",
    },
    footer: {
      builtWith: "Construido con Next.js y Tailwind CSS.",
      source: "Código de este sitio",
      rights: "Todos los derechos reservados.",
    },
    terminal: {
      lines: [
        "Analista en Sistemas (UTN) — título intermedio 2026.",
        "Apasionado por la automatización (n8n, Docker).",
        "Construyo puentes entre la lógica de negocio y la UI.",
        '"Transformando código en eficiencia B2B."',
      ],
    },
    misc: {
      openToWork: "Disponible para trabajar",
    },
  },

  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      about: "About",
      contact: "Contact",
      cv: "Download CV",
      skipToContent: "Skip to content",
      menu: "Menu",
    },
    home: {
      greeting: "Hi, I'm",
      pitch:
        "I design and build end-to-end systems focused on automation and efficiency. Backend, frontend and workflows working as one.",
      now: "Now: studying Systems Engineering (UTN) and building B2B automations with n8n.",
      viewProjects: "View projects",
      contactMe: "Get in touch",
      featuredTitle: "Featured projects",
      featuredSubtitle:
        "Three cases where I applied software engineering to a concrete business problem.",
      seeAll: "See all projects",
    },
    projects: {
      title: "Projects",
      subtitle:
        "Each project is a case study: the problem, what I built, the stack, and the measured result.",
      filterAll: "All",
      filterWeb: "Web apps",
      filterAutomation: "Automation",
      typeWeb: "Web app",
      typeAutomation: "Automation",
      internalNote: "Internal project — no public demo",
      live: "Live demo",
      repo: "Code",
      writeup: "Write-up",
      role: "Role",
      period: "Period",
      context: "Context",
      stack: "Stack",
      back: "Back to projects",
    },
    caseStudy: {
      problem: "The problem",
      built: "What I built",
      stackLabel: "Stack",
      result: "Result",
      links: "Links",
      retro: "What I'd do differently",
    },
    about: {
      title: "About",
      subtitle:
        "I combine engineering fundamentals with real experience building and automating software.",
      bio: [
        "I'm an advanced Systems Engineering student (UTN), about to earn my Systems Analyst degree.",
        "I mostly work on two fronts: full-stack web apps with React / Next.js / Django, and B2B process automation with n8n and AI integrations.",
        "I'm drawn to where business logic meets the interface: understand the process, measure it, and leave it running on its own.",
      ],
      timelineTitle: "Timeline",
      skillsTitle: "Stack by level of use",
      skillsNote:
        "Grouped honestly: what I use on real work, what I'm comfortable with, and what I'm still learning.",
      languagesTitle: "Languages",
      tierUsing: "I work with this",
      tierComfortable: "Comfortable with",
      tierLearning: "Learning",
    },
    contact: {
      title: "Contact",
      subtitle:
        "The best way to reach me is by email or LinkedIn. I usually reply within 24–48 h.",
      nameLabel: "Name",
      emailLabel: "Email",
      messageLabel: "Message",
      send: "Send message",
      sending: "Sending…",
      sent: "Thanks! I'll get back to you soon.",
      error: "Couldn't send. Email me directly at",
      orReach: "Or directly:",
      required: "This field is required",
      invalidEmail: "Invalid email",
    },
    footer: {
      builtWith: "Built with Next.js and Tailwind CSS.",
      source: "Source of this site",
      rights: "All rights reserved.",
    },
    terminal: {
      lines: [
        "Systems Analyst (UTN) — intermediate degree 2026.",
        "Passionate about automation (n8n, Docker).",
        "I build bridges between business logic and the UI.",
        '"Turning code into B2B efficiency."',
      ],
    },
    misc: {
      openToWork: "Open to work",
    },
  },
} as const;

/**
 * Tipo estructural: misma forma que dictionary.es pero con los strings
 * "ensanchados" a `string`, para que dictionary.es y dictionary.en sean
 * intercambiables (los literales de cada idioma son distintos).
 */
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : { [K in keyof T]: Widen<T[K]> };

export type Dictionary = Widen<(typeof dictionary)["es"]>;
