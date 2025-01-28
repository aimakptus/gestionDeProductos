import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Header.css";

const Header = ({ onLogout }) => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          const response = await axios.get("http://localhost:5000/api/users/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUserName(response.data.fullName);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserName();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Elimina el token
    onLogout(); // Notifica al estado global
  };

  return (
    <header className="header">
      <h1 className="headerTitle">INVBENCH</h1>
      <div className="headerIcons">
        <button 
          className="iconButtonUser" 
          aria-label="Usuario" 
          onClick={handleLogout} // Cierra sesión al hacer clic
        >
          {userName ? userName.charAt(0).toUpperCase() : "A"}
        </button>
      </div>
    </header>
  );
};

export default Header;