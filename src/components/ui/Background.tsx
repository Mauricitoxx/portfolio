'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar tamaño del canvas
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);

    // Propiedades de la lluvia (Estilo Apple / Glass)
    const raindrops: { x: number; y: number; length: number; speed: number; opacity: number }[] = [];
    const dropCount = 500; // Aumentado significativamente para más robustez

    for (let i = 0; i < dropCount; i++) {
      raindrops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 25 + 15,
        speed: Math.random() * 3 + 2, // Lluvia un poco más rápida
        opacity: Math.random() * 0.4 + 0.8, // Más visible
      });
    }

    let animationFrameId: number;

    const draw = () => {
      // Limpiar con un fondo semi-transparente para dejar un rastro muy suave
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(0, 0, width, height);

      // Dibujar gotas
      for (let i = 0; i < raindrops.length; i++) {
        const drop = raindrops[i];

        // Gradiente para la gota (Apple Style: Blanco/Azul claro)
        const gradient = ctx.createLinearGradient(drop.x, drop.y, drop.x, drop.y + drop.length);
        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
        gradient.addColorStop(1, `rgba(10, 132, 255, ${drop.opacity})`); // Azul estilo iOS

        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Mover gota
        drop.y += drop.speed;

        // Reiniciar gota si sale de la pantalla
        if (drop.y > height) {
          drop.y = -drop.length;
          drop.x = Math.random() * width;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-[#000000] overflow-hidden pointer-events-none flex items-center justify-center">

      {/* Canvas de Lluvia Elegante */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-60 mix-blend-screen"
      />

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
