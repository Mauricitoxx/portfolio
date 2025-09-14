// src/components/Hero.jsx

import React, { useEffect, useState } from "react";
import "./Hero.css";


const lines = [
  ["Hola,"],
  ["Soy", "Mauro", "Lista"],
  ["Bienvenido", "a", "mi", "Portfolio"]
];


export default function Hero() {
  // Initialize all words as false
  const [active, setActive] = useState([false, [false, false, false], [false, false, false, false]]);

  useEffect(() => {
    const timers = [];
    // Primera línea
    timers.push(setTimeout(() => setActive(prev => [true, prev[1], prev[2]]), 400));
    // Segunda línea
    timers.push(setTimeout(() => setActive(prev => [prev[0], [true, false, false], prev[2]]), 900));
    timers.push(setTimeout(() => setActive(prev => [prev[0], [true, true, false], prev[2]]), 1300));
    timers.push(setTimeout(() => setActive(prev => [prev[0], [true, true, true], prev[2]]), 1700));
    // Tercera línea
    timers.push(setTimeout(() => setActive(prev => [prev[0], prev[1], [true, false, false, false]]), 2100));
    timers.push(setTimeout(() => setActive(prev => [prev[0], prev[1], [true, true, false, false]]), 2500));
    timers.push(setTimeout(() => setActive(prev => [prev[0], prev[1], [true, true, true, false]]), 2900));
    timers.push(setTimeout(() => setActive(prev => [prev[0], prev[1], [true, true, true, true]]), 3300));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="hero-bg">
      <div className="hero-text">
        <div className="hero-line">
          <span className={`hero-word${active[0] ? " active" : ""}`}>Hola,</span>
        </div>
        <div className="hero-line">
          <span className={`hero-word${active[1][0] ? " active" : ""}`}>Soy</span>
          <span className={`hero-word${active[1][1] ? " active" : ""}`}>Mauro</span>
          <span className={`hero-word${active[1][2] ? " active" : ""}`}>Lista</span>
        </div>
        <div className="hero-line">
          <span className={`hero-word${active[2][0] ? " active" : ""}`}>Bienvenido</span>
          <span className={`hero-word${active[2][1] ? " active" : ""}`}>a</span>
          <span className={`hero-word${active[2][2] ? " active" : ""}`}>mi</span>
          <span className={`hero-word${active[2][3] ? " active" : ""}`}>Portfolio</span>
        </div>
      </div>
    </div>
  );
}
