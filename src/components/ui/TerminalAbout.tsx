'use client';

import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export default function TerminalAbout() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="w-full max-w-md bg-white/5 backdrop-blur-3xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl pointer-events-auto"
    >
      {/* Barra superior estilo MacOS */}
      <div className="bg-white/5 px-4 py-3 flex items-center justify-between border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
        </div>
        <div className="flex items-center gap-2 text-white/40 text-xs font-medium">
          <Terminal size={14} />
          <span>mauro — -bash</span>
        </div>
        <div className="w-16" /> {/* Espaciador para centrar */}
      </div>

      {/* Contenido de la terminal */}
      <div className="p-6 font-mono text-sm">
        <div className="flex gap-2 text-white/50">
          <span>~</span>
          <span className="text-white/90">cat about_me.txt</span>
        </div>
        <div className="mt-3 text-white/80 leading-relaxed font-light">
          {">"} Systems Analyst (UTN - 2026).<br />
          {">"} Apasionado por la automatización (n8n, Docker).<br />
          {">"} Construyendo puentes entre lógica de negocio y UI/UX.<br />
          {">"} &quot;Transformando código en eficiencia B2B&quot;.
        </div>
        <div className="flex gap-2 mt-5 text-white/50 animate-pulse">
          <span>~</span>
          <span className="w-2 h-4 bg-white/80 block" />
        </div>
      </div>
    </motion.div>
  );
}
