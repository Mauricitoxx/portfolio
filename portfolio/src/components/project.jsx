import React, { useEffect, useState } from "react";

function Projects() {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/proyectos")
      .then(res => res.json())
      .then(data => setProyectos(data));
  }, []);

  return (
    <section className="py-20 bg-gray-800 text-white px-4">
      <h2 className="text-3xl font-bold mb-8 text-center section-title">Proyectos</h2>
      <div className="flex overflow-x-auto gap-4 px-2 scrollbar-hide">
        {proyectos.map((p, idx) => (
          <div
            key={idx}
            className="bg-gray-700 rounded-lg p-4 flex-shrink-0 w-60"
          >
            <img src={p.imagen || "https://via.placeholder.com/150"} alt={p.nombre} className="rounded mb-4" />
            <h3 className="text-xl font-semibold">{p.nombre}</h3>
            <p className="text-gray-300">{p.etapa}</p>
            <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Ver más</a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
