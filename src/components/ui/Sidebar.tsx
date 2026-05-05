'use client';

import { Home, Briefcase, Code2, GraduationCap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { t, language, setLanguage } = useLanguage();

  const navItems = [
    { id: 'home', icon: Home, label: t.sidebar.home },
    { id: 'projects', icon: Briefcase, label: t.sidebar.projects },
    { id: 'stack', icon: Code2, label: t.sidebar.stack },
    { id: 'education', icon: GraduationCap, label: t.sidebar.education },
  ];

  return (
    <motion.nav 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 md:bottom-auto md:left-6 md:top-1/2 md:-translate-y-1/2 md:-translate-x-0 z-50 pointer-events-auto w-[90%] md:w-auto"
    >
      <div className="flex flex-row md:flex-col justify-between md:justify-start gap-2 md:gap-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full p-3 shadow-2xl items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`group relative p-3 rounded-full transition-all duration-300 ${
                isActive ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/80 hover:bg-white/5'
              }`}
              title={item.label}
            >
              <Icon className="w-5 h-5 transition-colors duration-300" />
              
              {/* Tooltip Apple Style */}
              <span className="absolute left-full ml-4 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 text-white/90 text-xs font-medium rounded-lg opacity-0 md:group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl hidden md:block">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
