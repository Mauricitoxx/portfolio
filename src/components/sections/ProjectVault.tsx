'use client';

import { FolderGit2, ExternalLink, Code2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

function SpotlightCard({ children, delay }: { children: React.ReactNode, delay: number }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="relative bg-white/5 backdrop-blur-2xl border border-white/10 hover:border-white/20 rounded-3xl p-8 transition-all duration-500 group flex flex-col h-full shadow-lg cursor-pointer overflow-hidden"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.08), transparent 40%)`,
        }}
      />
      <div className="relative z-10 flex flex-col h-full">
        {children}
      </div>
    </motion.div>
  );
}

export default function ProjectVault() {
  const { t } = useLanguage();

  const projectsData = [
    {
      title: t.projects.reposicion.title,
      metric: t.projects.reposicion.metric,
      description: t.projects.reposicion.desc,
      tech: ['n8n', 'Lógica de Decisión', 'APIs'],
      github: 'https://github.com/Mauricitoxx'
    },
    {
      title: t.projects.chatbot.title,
      metric: t.projects.chatbot.metric,
      description: t.projects.chatbot.desc,
      tech: ['n8n', 'IA Automations', 'B2B'],
      github: 'https://github.com/Mauricitoxx'
    },
    {
      title: t.projects.suchus.title,
      metric: t.projects.suchus.metric,
      description: t.projects.suchus.desc,
      tech: ['React', 'Next.js', 'Chatbot IA'],
      github: 'https://github.com/Mauricitoxx/Suchus-Design'
    },
    {
      title: t.projects.jf.title,
      metric: t.projects.jf.metric,
      description: t.projects.jf.desc,
      tech: ['React', 'Node.js', 'Cloudinary'],
      github: 'https://jf-tecnologias.com'
    }
  ];

  return (
    <div className="w-full min-h-screen flex flex-col justify-center py-24 pointer-events-auto max-w-6xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-semibold text-white mb-3 flex items-center gap-3 tracking-tight">
            <FolderGit2 className="text-blue-400" />
            {t.projects.title}
          </h2>
          <p className="text-white/60 max-w-2xl text-lg font-light">
            {t.projects.subtitle}
          </p>
        </div>
        <a
          href="https://github.com/Mauricitoxx"
          target="_blank"
          rel="noreferrer"
          className="hidden md:flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white/90 px-5 py-2.5 rounded-full border border-white/10 transition-colors backdrop-blur-md"
        >
          <Code2 size={18} />
          <span className="text-sm font-medium">@Mauricitoxx</span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectsData.map((project, index) => (
          <SpotlightCard key={index} delay={index * 0.1}>
            <div className="flex justify-between items-start mb-5">
              <h3 className="text-2xl font-semibold text-white/90 tracking-tight">{project.title}</h3>
              <a href={project.github} target="_blank" rel="noreferrer" className="text-white/30 hover:text-blue-400 transition-colors bg-white/5 p-2 rounded-full">
                <ExternalLink size={18} />
              </a>
            </div>

            <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full w-max mb-5">
              <span className="text-blue-400 font-medium text-xs">
                {project.metric}
              </span>
            </div>

            <p className="text-white/60 mb-8 flex-1 font-light leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap items-center justify-between border-t border-white/10 pt-5 mt-auto">
              <div className="flex gap-2">
                {project.tech.map(t => (
                  <span key={t} className="text-xs text-white/40 bg-white/5 px-2.5 py-1 rounded-md">{t}</span>
                ))}
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}
