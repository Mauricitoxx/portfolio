'use client';

import { motion } from 'framer-motion';

export default function Background() {
  return (
    <div className="fixed inset-0 z-0 bg-[#000000] overflow-hidden pointer-events-none flex items-center justify-center">
      
      {/* Malla sutil (Grid pattern) para textura ligera */}
      <div className="absolute inset-0 z-0 opacity-30 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Orbes de luz con desenfoque extremo (Glassmorphism ambient) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
          x: [0, 50, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] bg-blue-600/20 blur-[120px] rounded-full z-10"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -50, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] right-[20%] w-[50vw] h-[50vw] bg-purple-600/10 blur-[150px] rounded-full z-10"
      />

    </div>
  );
}
