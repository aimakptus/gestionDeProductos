import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Header.css";

const Header = () => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        // Obtener el token del almacenamiento local (suponiendo que lo has guardado allí)
        const token = localStorage.getItem("authToken");

        if (token) {
          const response = await axios.get("http://localhost:5000/api/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // Asumimos que el backend devuelve el nombre completo del usuario
          setUserName(response.data.fullName);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <header className="header">
      <h1 className="headerTitle">INVBENCH</h1>
      <div className="headerIcons">
        <button className="iconButtonUser" aria-label="Usuario">
          {userName ? userName.charAt(0).toUpperCase() : "J"}
        </button>
      </div>
    </header>
  );
};

export default Header;