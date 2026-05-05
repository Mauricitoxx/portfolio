'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Stars, OrbitControls, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

// Constantes de colores "Suchus IT"
const COLORS = {
  background: '#001a1a',
  neonAccent: '#00ff41',
  planet: '#0b3d33',
};

// Componente de Planeta Central Interactiva
function CentralPlanet() {
  const sphereRef = useRef<THREE.Mesh>(null);

  // Hacer que el planeta reaccione un poco al mouse/pantalla
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.pointer.y * 0.5;
      sphereRef.current.rotation.y = state.pointer.x * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={sphereRef} scale={1.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={COLORS.planet}
          attach="material"
          distort={0.4} // Cantidad de distorsión
          speed={2}     // Velocidad de oscilación
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

// Anillo orbitando con textos/iconos del Stack
function OrbitingStack({ 
  radius, 
  speed, 
  items, 
  color, 
  yOffset = 0, 
  reverse = false 
}: { 
  radius: number, 
  speed: number, 
  items: string[], 
  color: string, 
  yOffset?: number,
  reverse?: boolean
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotación del anillo completo
      groupRef.current.rotation.y += (reverse ? -speed : speed) * delta;
    }
  });

  return (
    <group ref={groupRef} position={[0, yOffset, 0]}>
      {/* Línea del anillo visual */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Partículas / Textos del stack */}
      {items.map((item, index) => {
        const angle = (index / items.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={item} position={[x, 0, z]} rotation={[0, -angle + Math.PI/2, 0]}>
            <Text
              position={[0, 0.2, 0]}
              fontSize={0.2}
              color={color}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="#000000"
            >
              {item}
            </Text>
            {/* Pequeña esfera brillante debajo del texto */}
            <mesh position={[0, -0.1, 0]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshBasicMaterial color={color} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-screen bg-[#001a1a] relative cursor-crosshair">
      <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
        {/* Iluminación */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color={COLORS.neonAccent} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />

        {/* Fondo de Matriz (Estrellas densas) */}
        <Stars 
          radius={50} 
          depth={50} 
          count={7000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1} 
          color={COLORS.neonAccent}
        />

        {/* El Planeta */}
        <CentralPlanet />

        {/* Grupo Frontend (Radio interno) */}
        <OrbitingStack 
          radius={3} 
          speed={0.2} 
          items={['React', 'Next.js', 'Tailwind', 'JS/TS']} 
          color="#38bdf8" // Celeste tech
          yOffset={0.5}
        />

        {/* Grupo Backend (Radio medio) */}
        <OrbitingStack 
          radius={4.5} 
          speed={0.15} 
          items={['Django', 'Python', 'FastAPI', 'SQL']} 
          color="#10b981" // Verde esmeralda claro
          yOffset={-0.2}
          reverse
        />

        {/* Grupo Automation (Radio externo) */}
        <OrbitingStack 
          radius={6} 
          speed={0.1} 
          items={['n8n', 'Docker', 'AWS', 'Linux']} 
          color={COLORS.neonAccent} // Verde neón matrix
          yOffset={0.2}
        />

        {/* Controles para mover la cámara si el usuario arrastra */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.2}
          minPolarAngle={Math.PI / 2 - 0.5}
        />
      </Canvas>
    </div>
  );
}
