# Portfolio — Mauro Lista

Sitio personal de [Mauro Lista](https://github.com/Mauricitoxx): desarrollador
full-stack y de automatización (React · Next.js · Django · n8n).

**En vivo:** _TODO: agregá la URL cuando lo despliegues (dominio propio, no `*.vercel.app`)._

## Stack

- **Next.js 16** (App Router, rutas estáticas, `generateMetadata` por ruta)
- **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** (respetando `prefers-reduced-motion`)
- `lucide-react` para íconos

## Estructura

```
src/
  app/                 rutas: / · /proyectos · /proyectos/[slug] · /sobre-mi · /contacto
    api/contact/       endpoint del formulario de contacto
    sitemap.ts         · robots.ts · opengraph-image.tsx
  components/
    layout/            Nav, Footer, Background, SkipLink
    sections/          Hero, FeaturedProjects, Timeline, SkillTiers, TerminalCard
    ui/                ProjectCard, SectionHeading, Reveal
  context/             LanguageContext (toggle ES/EN, persistido)
  data/                projects.ts · profile.ts   ← el contenido vive acá
  i18n/                dictionary.ts              ← strings de UI (ES/EN)
  lib/                 site.ts                    ← config del sitio y contacto
```

Para **agregar un proyecto**: sumá un objeto al array de `src/data/projects.ts`.
No hay que tocar componentes.

## Desarrollo

```bash
npm install
npm run dev
```

Abre <http://localhost:3000>.

```bash
npm run build   # build de producción
npm run lint    # eslint
```

## Configuración pendiente (ver comentarios `TODO Mauro` en el código)

- `src/lib/site.ts`: dominio propio (`SITE_URL`) y URL real de LinkedIn.
- `src/data/projects.ts`: links de demo/repo, contexto de las métricas y las
  retrospectivas de cada proyecto; capturas en `public/proyectos/<slug>/`.
- `src/app/api/contact/route.ts`: variable `CONTACT_FORWARD_URL` (Formspree /
  Web3Forms) o integración con Resend para recibir los mensajes.

## Despliegue

Pensado para Vercel. Configurar las variables de entorno y un dominio propio.

## Licencia

MIT — ver [`LICENSE`](./LICENSE).
