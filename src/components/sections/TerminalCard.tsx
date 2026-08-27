'use client';

import { Terminal } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function TerminalCard() {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/70 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-[var(--color-border)]/70 bg-white/[0.03] px-4 py-3">
        <div className="flex gap-2" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-mute)]">
          <Terminal size={13} aria-hidden="true" />
          <span>mauro — bash</span>
        </div>
        <span className="w-14" />
      </div>

      <div className="p-6 font-mono text-sm">
        <p className="text-[var(--color-text-mute)]">
          <span className="select-none">~ </span>
          <span className="text-[var(--color-text)]">cat about_me.txt</span>
        </p>
        <div className="mt-3 space-y-1.5 text-[var(--color-text-soft)]">
          {t.terminal.lines.map((line) => (
            <p key={line}>
              <span className="select-none text-[var(--color-accent)]">{'> '}</span>
              {line}
            </p>
          ))}
        </div>
        <p className="mt-4 flex items-center gap-2 text-[var(--color-text-mute)]">
          <span className="select-none">~</span>
          <span className="inline-block h-4 w-2 animate-pulse bg-[var(--color-text-soft)]" />
        </p>
      </div>
    </div>
  );
}
