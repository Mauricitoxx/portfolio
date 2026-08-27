import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contactá a Mauro Lista por email o LinkedIn. Disponible para roles full-stack y de automatización, remoto o en La Plata / Buenos Aires.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return <ContactContent />;
}
