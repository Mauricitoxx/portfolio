'use client';

import { motion } from 'framer-motion';
import { Layout, Server, Zap, Database, Wrench } from 'lucide-react';
import dynamic from 'next/dynamic';

import { useLanguage } from '@/context/LanguageContext';

const TechCloud = dynamic(() => import('../ui/TechCloud'), { ssr: false });

export default function Skills() {
  const { t } = useLanguage();

  const skillCategories = [
    {
      title: t.stack.frontend,
      icon: Layout,
      skills: ['React/Native', 'Angular', 'Next.js', 'Responsive Design', 'API Integration', 'Tailwind CSS', 'Kotlin'],
      color: '#0a84ff' // Apple blue
    },
    {
      title: t.stack.backend,
      icon: Server,
      skills: ['Django', 'REST APIs', 'Node.js', 'Auth Systems', 'API Design', 'FastAPI', '.NET'],
      color: '#30d158' // Apple green
    },
    {
      title: t.stack.automation,
      icon: Zap,
      skills: ['n8n', 'Workflow Automation', 'Webhooks', 'System Integration'],
      color: '#bf5af2' // Apple purple
    },
    {
      title: t.stack.databases,
      icon: Database,
      skills: ['SQLite', 'PostgreSQL', 'SQL Server', 'MongoDB', 'Database Design', 'Data Queries'],
      color: '#ff9f0a' // Apple orange
    },
    {
      title: t.stack.tools,
      icon: Wrench,
      skills: ['Git', 'GitHub', 'Docker', 'AWS Systems', 'Azure', 'Cloudinary', 'Office'],
      color: '#ff375f' // Apple pink/red
    }
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-center pointer-events-auto">
      <TechCloud />
      
      <div className="relative z-10">
        <div className="mb-8">
          <h2 className="text-4xl font-semibold text-white mb-3 flex items-center gap-3 tracking-tight">
            <Wrench className="text-blue-400" />
            {t.stack.title}
          </h2>
          <p className="text-white/60 max-w-2xl text-lg font-light">
            {t.stack.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-2xl border border-white/10 hover:border-white/20 p-8 rounded-3xl transition-all duration-300 group shadow-xl"
            >
              <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-5">
                <div 
                  className="p-3.5 rounded-2xl bg-white/5 shadow-sm border border-white/10 group-hover:scale-110 transition-transform"
                  style={{ color: category.color }}
                >
                  <Icon size={24} />
                </div>
                <h3 className="text-white/90 font-medium text-lg tracking-tight">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-3 py-1.5 bg-white/5 border border-white/5 text-white/70 text-xs rounded-lg hover:bg-white/10 hover:text-white cursor-default transition-colors font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
