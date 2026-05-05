'use client';

import { motion } from 'framer-motion';
import TerminalAbout from './TerminalAbout';
import { useLanguage } from '@/context/LanguageContext';

export default function HomeView() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="w-full h-full flex flex-col justify-center"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tight">
              {t.home.title}
            </h1>
            <h2 className="text-xl md:text-2xl text-blue-400 font-medium tracking-wide mt-2">
              {t.home.subtitle}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/60 text-lg max-w-xl font-light leading-relaxed"
          >
            {t.home.description1}
            <br />
            {t.home.description2}
            <br />
            <br />
            <b><b>{t.home.student}</b></b>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 mt-4 pointer-events-auto"
          >
            <a 
              href="/CV_Mauro_Lista.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-full transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>
              {t.home.downloadCV}
            </a>
            <a 
              href="https://wa.me/542215410023"
              target="_blank"
              rel="noopener noreferrer" 
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full transition-colors flex items-center gap-2 border border-white/10 backdrop-blur-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
              {t.home.contact}
            </a>
          </motion.div>
        </div>
        <div className="lg:col-span-6">
          <TerminalAbout />
        </div>
      </div>
    </motion.div >
  );
}
