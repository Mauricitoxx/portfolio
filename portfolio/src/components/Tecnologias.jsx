import React, { useEffect, useState } from "react";
import CircularGallery from "./CircularGallery";

export default function Technologies() {
  const [tecnologias, setTecnologias] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/tecnologias")
      .then(res => res.json())
      .then(data => setTecnologias(data));
  }, []);

  return (
    <div className="py-20 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Tecnologías</h2>
      <CircularGallery items={tecnologias} />
    </div>
  );
}
