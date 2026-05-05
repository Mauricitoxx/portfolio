'use client';

import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      className="fixed top-6 right-6 z-50 pointer-events-auto"
    >
      <button
        onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
        className="group relative flex items-center justify-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full shadow-lg transition-all duration-300 hover:bg-white/10 hover:border-white/20"
        title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      >
        <Globe className="w-4 h-4 text-white/70 group-hover:text-white transition-colors duration-300" />
        <span className="text-white/80 text-sm font-medium tracking-wide">
          {language === 'es' ? 'ES' : 'EN'}
        </span>
      </button>
    </motion.div>
  );
}
