import { NextResponse } from "next/server";

/**
 * Endpoint del formulario de contacto.
 *
 * TODO Mauro: conectá un servicio real para que te lleguen los mensajes.
 * Dos opciones simples:
 *
 *  A) Formspree / Web3Forms: poné la URL en CONTACT_FORWARD_URL (env var) y
 *     este handler ya la reenvía.
 *  B) Resend (https://resend.com): instalá `resend`, poné RESEND_API_KEY y
 *     reemplazá el bloque de forward por un resend.emails.send(...).
 *
 * Mientras no haya nada configurado, valida y responde 200 en desarrollo
 * (así podés probar la UI) y 503 en producción (para que sepas que falta).
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Faltan campos" }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 422 });
  }

  const forwardUrl = process.env.CONTACT_FORWARD_URL;

  if (forwardUrl) {
    try {
      const res = await fetch(forwardUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error(`forward ${res.status}`);
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("contact forward failed:", err);
      return NextResponse.json({ error: "No se pudo enviar" }, { status: 502 });
    }
  }

  if (process.env.NODE_ENV === "production") {
    console.warn("CONTACT_FORWARD_URL no configurado — mensaje descartado.");
    return NextResponse.json(
      { error: "Formulario no configurado" },
      { status: 503 },
    );
  }

  console.info("[contacto] (dev, sin forward)", { name, email, message });
  return NextResponse.json({ ok: true, dev: true });
}
