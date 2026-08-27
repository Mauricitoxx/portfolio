import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.role.es}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#05070a",
          color: "#f2f5f8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#4c9dff", letterSpacing: 2 }}>
          {SITE.availability.es.toUpperCase()}
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700, marginTop: 24 }}>
          {SITE.name}
        </div>
        <div style={{ display: "flex", fontSize: 40, color: "#c2ccd6", marginTop: 12 }}>
          {SITE.role.es}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#93a1ad",
            marginTop: 40,
            maxWidth: 900,
          }}
        >
          React · Next.js · Django · n8n — proyectos con impacto medible
        </div>
      </div>
    ),
    size,
  );
}
