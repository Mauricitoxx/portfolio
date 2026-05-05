'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Background from '@/components/ui/Background';
import Sidebar from '@/components/ui/Sidebar';
import HomeView from '@/components/ui/HomeView';
import LanguageToggle from '@/components/ui/LanguageToggle';
import Skills from '@/components/sections/Skills';
import Education from '@/components/sections/Education';
import ProjectVault from '@/components/sections/ProjectVault';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden font-sans">
      {/* 1. Fondo Apple Style (Lluvia de desenfoques) */}
      <Background />

      {/* 2. Navegación Lateral */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <LanguageToggle />

      {/* 3. Contenedor de Vistas (Carga Lateral) */}
      <div className="absolute inset-0 px-6 pb-28 pt-24 md:pl-28 md:pr-12 md:py-12 flex flex-col justify-center max-w-7xl mx-auto z-10 pointer-events-none">
        
        {/* Usamos un div interno que acepte clicks para el contenido actual */}
        <div className="w-full h-full md:h-[85vh] relative pointer-events-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && (
              <motion.div key="home" className="absolute inset-0 overflow-y-auto custom-scrollbar pr-4" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}>
                <HomeView />
              </motion.div>
            )}
            
            {activeTab === 'projects' && (
              <motion.div key="projects" className="absolute inset-0 overflow-y-auto custom-scrollbar pr-4" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}>
                <ProjectVault />
              </motion.div>
            )}

            {activeTab === 'stack' && (
              <motion.div key="stack" className="absolute inset-0 overflow-y-auto custom-scrollbar pr-4" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}>
                <Skills />
              </motion.div>
            )}

            {activeTab === 'education' && (
              <motion.div key="education" className="absolute inset-0 overflow-y-auto custom-scrollbar pr-4" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}>
                <Education />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </main>
  );
}
