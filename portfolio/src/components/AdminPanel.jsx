export default function AdminPanel() {
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

  useEffect(() => {
    fetch("http://localhost:8000/proyectos")
      .then(res => res.json())
      .then(data => setProyectos(data));
    fetch("http://localhost:8000/tecnologias")
      .then(res => res.json())
      .then(data => setTecnologias(data));
  }, []);

  function handleAdd(e) {
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
    <div className="admin-panel">
      <h2>Panel de Administración</h2>
      {/* Formulario de Proyectos */}
      <form onSubmit={handleAdd} className="admin-form">
        <input
          type="text"
          placeholder="Nombre del proyecto"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Etapa (descripción o fecha)"
          value={etapa}
          onChange={e => setEtapa(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Link"
          value={link}
          onChange={e => setLink(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Imagen (URL)"
          value={imagen}
          onChange={e => setImagen(e.target.value)}
          required
        />
        <button type="submit">Agregar Proyecto</button>
      </form>
      <div className="admin-list">
        {proyectos.map((p, i) => (
          <div key={i} className="admin-item">
            <strong>{p.nombre}</strong>
            <p>{p.etapa}</p>
            <a href={p.link} target="_blank" rel="noopener noreferrer">Ver más</a>
            <img src={p.imagen} alt={p.nombre} style={{ maxWidth: "100px" }} />
          </div>
        ))}
      </div>

      {/* Formulario de Tecnologías */}
      <form onSubmit={handleAddTecnologia} className="admin-form" style={{ marginTop: "2rem" }}>
        <input
          type="text"
          placeholder="Nombre de la tecnología"
          value={tecNombre}
          onChange={e => setTecNombre(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Imagen (URL)"
          value={tecImagen}
          onChange={e => setTecImagen(e.target.value)}
          required
        />
        <button type="submit">Agregar Tecnología</button>
      </form>
      <div className="admin-list">
        {tecnologias.map((t, i) => (
          <div key={i} className="admin-item">
            <strong>{t.nombre}</strong>
            <img src={t.imagen} alt={t.nombre} style={{ maxWidth: "100px" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
