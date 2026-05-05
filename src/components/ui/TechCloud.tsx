'use client';

import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

const technologies = [
  "Node.js", "React", "Next.js", "PostgreSQL", "Docker", 
  "n8n", "TypeScript", "AWS", "MongoDB", "GraphQL",
  "TailwindCSS", "Python", "FastAPI", "Django", "Git"
];

// Componente para cada palabra individual
function Word({ children, position }: { children: string, position: THREE.Vector3 }) {
  const ref = useRef<THREE.Group>(null);
  
  // Hacemos que el texto siempre mire hacia la cámara (billboarding)
  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <group ref={ref} position={position}>
      <Text
        fontSize={1.5}
        color="#38bdf8" // Cyan/blue suave para combinar con tema oscuro
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.9}
        outlineWidth={0.04}
        outlineColor="#0284c7"
      >
        {children}
      </Text>
    </group>
  );
}

function Cloud({ radius = 10 }) {
  const groupRef = useRef<THREE.Group>(null);

  // Distribuir los puntos usando una esfera de Fibonacci
  const words = useMemo(() => {
    const temp: { word: string; pos: THREE.Vector3 }[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    const n = technologies.length;

    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      temp.push({
        word: technologies[i],
        pos: new THREE.Vector3(x * radius, y * radius, z * radius),
      });
    }
    return temp;
  }, [radius]);

  // Rotación continua y suave
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.15;
      groupRef.current.rotation.x -= delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {words.map((w, i) => (
        <Word key={i} position={w.pos}>
          {w.word}
        </Word>
      ))}
    </group>
  );
}

export default function TechCloud() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-end overflow-hidden" aria-hidden="true">
      {/* Contenedor posicionado a la derecha, con opacidad muy baja */}
      <div 
        className="w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] fixed right-[-30%] md:right-[-10%] top-1/2 -translate-y-1/2 opacity-20"
        style={{
          maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 85%)',
          WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 85%)'
        }}
      >
        <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
          <ambientLight intensity={1} />
          <Cloud radius={8} />
        </Canvas>
      </div>
    </div>
  );
}
