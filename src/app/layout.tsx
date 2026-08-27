import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { LanguageProvider } from "@/context/LanguageContext";
import Background from "@/components/layout/Background";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import SkipLink from "@/components/layout/SkipLink";
import { SITE, SITE_URL, CONTACT } from "@/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} — ${SITE.role.es}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description.es,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.role.es}`,
    description: SITE.description.es,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.role.es}`,
    description: SITE.description.es,
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: SITE.role.en,
  url: SITE_URL,
  email: `mailto:${CONTACT.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "La Plata",
    addressRegion: "Buenos Aires",
    addressCountry: "AR",
  },
  sameAs: [CONTACT.github, CONTACT.linkedin],
  knowsLanguage: ["es", "en"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <LanguageProvider>
          <SkipLink />
          <Background />
          <Nav />
          <main id="contenido" className="container-page min-h-[60vh]">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
