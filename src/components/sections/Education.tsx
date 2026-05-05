'use client';

import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Briefcase, Code, MapPin } from 'lucide-react';

const timelineData = [
  {
    title: 'Inicio Académico',
    institution: 'Ingeniería en Sistemas (UTN)',
    date: '2022',
    modality: '— Presencial',
    icon: GraduationCap,
    description: 'Comienzo de mi formación universitaria. Estableciendo bases fundamentales en lógica de programación, algoritmos y arquitectura de computadoras.'
  },
  {
    title: 'Desarrollador Fullstack',
    institution: 'Freelance / Proyectos',
    date: '2024',
    modality: '— Presencial',
    icon: Code,
    description: 'Consolidación en tecnologías modernas (Next.js, Node.js, Cloud). Desarrollo de aplicaciones end-to-end e integraciones de ecosistemas escalables.'
  },
  {
    title: 'Automatización de Procesos',
    institution: 'Eliggi',
    date: '2025 - 2026',
    modality: '— Híbrido',
    icon: Briefcase,
    description: 'Rediseño de flujos de trabajo y desarrollo de software B2B. Implementación de automatizaciones clave logrando una reducción del 70% en tiempos de procesos manuales.'
  },
  {
    title: 'Analista en Sistemas',
    institution: 'Título Intermedio (UTN)',
    date: '2026',
    modality: '— Presencial',
    icon: BookOpen,
    description: 'Finalización de la titulación intermedia, formalizando mis competencias analíticas, lógica de negocios y diseño de bases de datos.'
  },
  {
    title: 'Ingeniería en Sistemas',
    institution: 'Universidad Tecnológica Nacional (UTN)',
    date: '2027',
    modality: '— Presencial',
    icon: GraduationCap,
    description: 'Culminación de la carrera de grado. Foco en arquitectura de software avanzada, infraestructura cloud y dirección de proyectos tecnológicos a gran escala.'
  }
];

export default function Education() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-start pt-24 pb-12 pointer-events-auto max-w-5xl mx-auto">
      <div className="mb-16 text-center">
        <h2 className="text-4xl font-semibold text-white mb-3 flex items-center justify-center gap-3 tracking-tight">
          <MapPin className="text-[#38bdf8]" />
          Trayectoria & Idiomas
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto text-lg font-light">
          El hilo conductor de mi formación, experiencia profesional y evolución técnica.
        </p>
      </div>

      {/* Timeline Alternado */}
      <div className="relative w-full mb-20">
        {/* Línea central (oculta en mobile, centrada en desktop) */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#38bdf8]/60 md:-translate-x-1/2 shadow-[0_0_8px_#38bdf8]"></div>

        <div className="space-y-12">
          {timelineData.map((item, index) => {
            const Icon = item.icon;
            // Alternamos: index 0 (Left), index 1 (Right), index 2 (Left), index 3 (Right)
            const isRight = index % 2 !== 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className={`relative flex items-center w-full ${isRight ? 'md:justify-end' : 'md:justify-start'}`}
              >
                {/* Icono central */}
                <div className="absolute left-6 md:left-1/2 w-8 h-8 rounded-full bg-black border-2 border-[#38bdf8] flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_10px_#38bdf8] transition-transform hover:scale-110">
                  <Icon size={14} className="text-[#38bdf8]" />
                </div>

                {/* Tarjeta de contenido */}
                <div className={`w-[calc(100%-4rem)] ml-16 md:ml-0 md:w-[calc(50%-3rem)]`}>
                  <div className="bg-transparent border border-white/20 p-6 rounded-xl hover:border-white/40 transition-colors">

                    <div className={`flex flex-col ${isRight ? 'md:text-right md:items-end' : 'text-left items-start'}`}>
                      <h3 className="text-[#38bdf8] font-bold text-xl tracking-tight">{item.title}</h3>
                      <p className="text-white/90 text-sm mt-1">{item.institution}</p>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[#38bdf8] text-sm">{item.date}</span>
                        <span className="text-white/50 text-sm italic">{item.modality}</span>
                      </div>
                    </div>

                    <div className={`mt-5 flex items-start gap-3 ${isRight ? 'md:flex-row-reverse' : ''}`}>
                      <span className="text-[#38bdf8] mt-0.5 text-[10px]">▶</span>
                      <p className={`text-white/70 text-sm leading-relaxed ${isRight ? 'md:text-right' : 'text-left'}`}>
                        {item.description}
                      </p>
                    </div>

                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Idiomas en la parte inferior */}
      <div className="mt-8 border-t border-white/10 pt-12">
        <h3 className="text-white/80 font-medium mb-8 text-xl tracking-tight text-center">Idiomas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
            <div className="flex justify-between mb-3">
              <span className="text-white/90 font-medium">Español</span>
              <span className="text-[#38bdf8] text-sm font-medium">Nativo</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#38bdf8] h-full w-full shadow-[0_0_8px_#38bdf8]"></div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
            <div className="flex justify-between mb-3">
              <span className="text-white/90 font-medium">Inglés</span>
              <span className="text-white/50 text-sm">Técnico / Intermedio</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#38bdf8] h-full w-[60%] shadow-[0_0_8px_#38bdf8]"></div>
            </div>
            <p className="text-xs text-white/40 mt-3 font-light leading-relaxed">Lectura de documentación y escritura de código fluida.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
