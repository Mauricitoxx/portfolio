import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-mono text-sm text-[var(--color-accent)]">404</p>
      <h1 className="mt-2 text-2xl font-semibold text-[var(--color-text)]">
        Página no encontrada
      </h1>
      <p className="mt-2 text-[var(--color-text-mute)]">
        El enlace no existe o cambió de lugar.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-[var(--color-accent-strong)] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent)]"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
