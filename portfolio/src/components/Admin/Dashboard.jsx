// src/components/Admin/Dashboard.jsx
import React, { useState } from "react";

function Dashboard({ onLogout }) {
  // Proyecto
  const [nombre, setNombre] = useState("");
  const [etapa, setEtapa] = useState("");
  const [link, setLink] = useState("");
  const [imagen, setImagen] = useState("");
  const [proyectos, setProyectos] = useState([]);

  // Tecnología
  const [tecNombre, setTecNombre] = useState("");
  const [tecImagen, setTecImagen] = useState("");
  const [tecnologias, setTecnologias] = useState([]);

  // Cargar proyectos y tecnologías al inicio
  React.useEffect(() => {
    fetch("http://localhost:8000/proyectos")
      .then(res => res.json())
      .then(data => setProyectos(data));
    fetch("http://localhost:8000/tecnologias")
      .then(res => res.json())
      .then(data => setTecnologias(data));
  }, []);

  function handleAddProyecto(e) {
    e.preventDefault();
    if (nombre && etapa && link && imagen) {
      fetch("http://localhost:8000/proyectos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, etapa, link, imagen })
      })
        .then(res => res.json())
        .then(newProyecto => {
          setProyectos(prev => [...prev, newProyecto]);
          setNombre("");
          setEtapa("");
          setLink("");
          setImagen("");
        });
    }
  }

  function handleAddTecnologia(e) {
    e.preventDefault();
    if (tecNombre && tecImagen) {
      fetch("http://localhost:8000/tecnologias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: tecNombre, imagen: tecImagen })
      })
        .then(res => res.json())
        .then(newTec => {
          setTecnologias(prev => [...prev, newTec]);
          setTecNombre("");
          setTecImagen("");
        });
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#222", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>Panel de Administración</h1>
      <button onClick={onLogout} style={{ background: "#e53e3e", color: "#fff", padding: "1rem 2rem", border: "none", borderRadius: "8px", fontSize: "1rem", marginBottom: "2rem" }}>Cerrar sesión</button>

      {/* Formulario de Proyectos */}
      <form onSubmit={handleAddProyecto} style={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "350px", width: "100%" }}>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Agregar Proyecto</h2>
        <input type="text" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
        <input type="text" placeholder="Etapa" value={etapa} onChange={e => setEtapa(e.target.value)} required />
        <input type="text" placeholder="Link" value={link} onChange={e => setLink(e.target.value)} required />
        <input type="text" placeholder="Imagen (URL)" value={imagen} onChange={e => setImagen(e.target.value)} required />
        <button type="submit" style={{ background: "#3182ce", color: "#fff", padding: "0.5rem", border: "none", borderRadius: "6px" }}>Cargar Proyecto</button>
      </form>
      <div style={{ marginBottom: "2rem", maxWidth: "350px", width: "100%" }}>
        <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Proyectos cargados:</h3>
        {proyectos.map((p, i) => (
          <div key={i} style={{ background: "#333", padding: "0.5rem", marginBottom: "0.5rem", borderRadius: "6px" }}>
            <strong>{p.nombre}</strong> - {p.etapa}
            <br />
            <a href={/^https?:\/\//.test(p.link) ? p.link : `https://${p.link}`} target="_blank" rel="noopener noreferrer" style={{ color: "#63b3ed" }}>Ver más</a>
            <br />
            <img src={/^https?:\/\//.test(p.imagen) ? p.imagen : "https://via.placeholder.com/100"} alt={p.nombre} style={{ maxWidth: "100px", marginTop: "0.5rem", borderRadius: "4px" }} />
          </div>
        ))}
      </div>

      {/* Formulario de Tecnologías */}
      <form onSubmit={handleAddTecnologia} style={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "350px", width: "100%" }}>
        <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Agregar Tecnología</h2>
        <input type="text" placeholder="Nombre" value={tecNombre} onChange={e => setTecNombre(e.target.value)} required />
        <input type="text" placeholder="Imagen (URL)" value={tecImagen} onChange={e => setTecImagen(e.target.value)} required />
        <button type="submit" style={{ background: "#38a169", color: "#fff", padding: "0.5rem", border: "none", borderRadius: "6px" }}>Cargar Tecnología</button>
      </form>
      <div style={{ marginBottom: "2rem", maxWidth: "350px", width: "100%" }}>
        <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Tecnologías cargadas:</h3>
        {tecnologias.map((t, i) => (
          <div key={i} style={{ background: "#333", padding: "0.5rem", marginBottom: "0.5rem", borderRadius: "6px", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <strong>{t.nombre}</strong>
            <img src={t.imagen} alt={t.nombre} style={{ maxWidth: "40px", borderRadius: "4px" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
