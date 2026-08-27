'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function SkipLink() {
  const { t } = useLanguage();
  return (
    <a href="#contenido" className="skip-link">
      {t.nav.skipToContent}
    </a>
  );
}
