// src/pages/Admin.jsx
import { useState } from "react";
import LoginModal from "../components/Admin/LoginModal";
import Dashboard from "../components/Admin/Dashboard";

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      {!loggedIn ? (
        <LoginModal onLogin={() => setLoggedIn(true)} />
      ) : (
        <Dashboard onLogout={() => setLoggedIn(false)} />
      )}
    </div>
  );
}
