import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Hero from "./components/Hero";
import Projects from "./components/project";
import Technologies from "./components/Tecnologias";
import ProfileSwitch from "./components/ProfileSwitch";
import LoginModal from "./components/LoginModal";
import Dashboard from "./components/Admin/Dashboard";

function App() {
  const [isDark, setIsDark] = useState(true);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDark);
    document.body.classList.toggle("light-mode", !isDark);
  }, [isDark]);

  // Mostrar el modal solo si loginOpen es true
  const showLoginModal = loginOpen && !loggedIn;

  return (
    <Router>
      <div className={isDark ? "bg-gray-900" : "bg-gray-100"}>
        <nav className="flex gap-4 p-4">
          <Link to="/" className="text-blue-500 hover:underline">Inicio</Link>
          <Link to="/admin" className="text-blue-500 hover:underline">Panel Admin</Link>
        </nav>
        <ProfileSwitch
          isDark={isDark}
          onToggle={() => setIsDark(d => !d)}
          onProfileClick={() => setLoginOpen(true)}
        />
        {showLoginModal && (
          <LoginModal
            open={true}
            onClose={() => setLoginOpen(false)}
            onLogin={() => {
              setLoggedIn(true);
              setLoginOpen(false);
            }}
          />
        )}
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Projects />
              <Technologies />
            </>
          } />
          <Route path="/admin" element={
            loggedIn ? (
              <Dashboard onLogout={() => setLoggedIn(false)} />
            ) : (
              <div className="flex flex-col items-center justify-center min-h-screen">
                <h2 className="text-2xl mb-4">Debes iniciar sesión para acceder al panel de administración</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setLoginOpen(true)}>Iniciar sesión</button>
              </div>
            )
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
