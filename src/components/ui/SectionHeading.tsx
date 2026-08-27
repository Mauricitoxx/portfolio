import type { ReactNode } from 'react';

export default function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-10">
      {eyebrow && (
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-text)] sm:text-3xl text-balance">
        {title}
      </h2>
      {children && (
        <p className="mt-3 max-w-2xl text-[var(--color-text-soft)]">{children}</p>
      )}
    </div>
  );
}
