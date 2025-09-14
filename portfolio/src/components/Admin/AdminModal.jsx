// src/components/Admin/LoginModal.jsx
import { useState } from "react";

function LoginModal({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "Maurinho@gmail.com" && password === "Maurojose14") {
      onLogin();
    } else {
      setError("Credenciales inválidas");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-xl shadow-lg w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login Admin</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-2 p-2 rounded bg-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full mb-2 p-2 rounded bg-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button className="w-full bg-blue-600 hover:bg-blue-500 p-2 rounded mt-3">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default LoginModal;
