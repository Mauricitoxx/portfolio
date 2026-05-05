'use client';

import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  metric: string;
  description: string;
  delay?: number;
  className?: string;
}

export default function ProjectCard({ title, metric, description, delay = 0, className = '' }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
      className={`bg-[#000d0d]/70 backdrop-blur-md border border-[#00ff41]/20 rounded-2xl p-6 flex flex-col justify-between overflow-hidden relative group pointer-events-auto ${className}`}
    >
      {/* Resplandor verde en hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00ff41]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          {description}
        </p>
      </div>

      <div className="relative z-10 mt-auto">
        <div className="inline-block px-3 py-1 bg-[#00ff41]/10 border border-[#00ff41]/30 rounded-lg">
          <span className="text-[#00ff41] font-mono font-bold text-sm">
            {metric}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
