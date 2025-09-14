import React from "react";
import "./ProfileSwitch.css";

export default function ProfileSwitch({ isDark, onToggle, onProfileClick }) {
  return (
    <div className="profile-switch">
      <button className="profile-btn" title="Iniciar sesión" onClick={onProfileClick}>
        <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Perfil" className="profile-img" />
      </button>
      <label className="switch">
        <input type="checkbox" checked={isDark} onChange={onToggle} />
        <span className="slider" />
      </label>
    </div>
  );
}
