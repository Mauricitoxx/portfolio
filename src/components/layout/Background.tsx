'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Fondo ambiental único y liviano: una malla sutil + dos orbes desenfocados.
 * Sin canvas 3D, sin librerías pesadas. Se detiene con prefers-reduced-motion.
 */
export default function Background() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden bg-[var(--color-bg)]"
    >
      <div className="absolute inset-0 opacity-[0.35] bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:44px_44px]" />

      <motion.div
        className="absolute -top-[10%] left-[8%] h-[42vw] w-[42vw] rounded-full bg-[var(--color-accent)]/12 blur-[120px]"
        animate={reduce ? undefined : { x: [0, 40, 0], y: [0, -30, 0], opacity: [0.18, 0.28, 0.18] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-15%] right-[5%] h-[48vw] w-[48vw] rounded-full bg-[#8b5cf6]/10 blur-[150px]"
        animate={reduce ? undefined : { x: [0, -40, 0], y: [0, 30, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
