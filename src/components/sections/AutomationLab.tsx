'use client';

import { motion } from 'framer-motion';
import { Webhook, Bot, Database, Zap, ArrowRight, Activity } from 'lucide-react';

const nodes = [
  { id: 'webhook', icon: Webhook, label: 'Trigger', sub: 'n8n Webhook', color: '#f59e0b' },
  { id: 'llm', icon: Bot, label: 'AI Processing', sub: 'OpenAI / LangChain', color: '#3b82f6' },
  { id: 'db', icon: Database, label: 'Data Sync', sub: 'PostgreSQL / Supabase', color: '#10b981' },
  { id: 'action', icon: Zap, label: 'Action', sub: 'Stock Update / Email', color: '#8b5cf6' },
];

export default function AutomationLab() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center py-24 pointer-events-auto max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="text-4xl font-semibold text-white mb-3 flex items-center gap-3 tracking-tight">
          <Activity className="text-blue-400" />
          Automation Lab
        </h2>
        <p className="text-white/60 max-w-2xl text-lg font-light">
          El motor detrás de mis proyectos. Transformando procesos manuales en flujos de trabajo eficientes. 
          Aquí una representación de la arquitectura interna que permite automatizar tareas complejas.
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden">
        {/* Lluvia sutil en el fondo del glass */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
          {nodes.map((node, index) => {
            const Icon = node.icon;
            return (
              <div key={node.id} className="flex flex-col md:flex-row items-center w-full md:w-auto group">
                
                {/* El Nodo */}
                <motion.div 
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-black/20 backdrop-blur-md border border-white/10 hover:border-white/30 p-6 rounded-2xl flex flex-col items-center gap-4 w-48 shadow-lg transition-colors relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 shadow-inner">
                    <Icon size={32} color={node.color} className="group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-center">
                    <h4 className="text-white/90 font-medium">{node.label}</h4>
                    <span className="text-xs text-white/50">{node.sub}</span>
                  </div>
                </motion.div>

                {/* La Conexión */}
                {index < nodes.length - 1 && (
                  <div className="hidden md:flex flex-1 w-16 items-center justify-center relative">
                    <div className="h-[1px] w-full bg-white/10 absolute"></div>
                    <motion.div 
                      className="absolute w-full h-[2px]"
                      style={{ background: `linear-gradient(90deg, transparent, ${nodes[index+1].color}, transparent)` }}
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                    <ArrowRight className="text-white/40 z-10 bg-transparent rounded-full" size={20} />
                  </div>
                )}
                {/* Conexión móvil (vertical) */}
                {index < nodes.length - 1 && (
                  <div className="md:hidden h-12 w-[1px] bg-white/10 my-2 relative">
                    <motion.div 
                      className="absolute w-[2px] h-full"
                      style={{ background: `linear-gradient(180deg, transparent, ${nodes[index+1].color}, transparent)` }}
                      animate={{ y: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>
                )}

              </div>
            );
          })}
        </div>
        
        {/* Overlay de métricas */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center md:justify-start relative z-10">
           <div className="bg-blue-500/10 border border-blue-500/20 px-6 py-3 rounded-full flex items-center gap-2 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span className="text-blue-400 text-sm font-medium">Arquitectura: Activa</span>
           </div>
           <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-full flex items-center gap-2 backdrop-blur-md">
              <span className="text-white/80 text-sm font-medium">Nodos Operativos: 4</span>
           </div>
        </div>
      </div>
    </div>
  );
}
