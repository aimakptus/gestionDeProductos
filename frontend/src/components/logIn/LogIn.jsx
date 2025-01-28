import React, { useState } from "react";
import axios from "axios";

import "./LogIn.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      // Guardar el token en el almacenamiento local
      localStorage.setItem("authToken", response.data.token);

      // Redirigir al usuario (puedes redirigir al home o dashboard)
      window.location.href = "/"; // O usar React Router para redirigir
    } catch (error) {
      setError(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="loginForm">
      <form onSubmit={handleSubmit}>
        <h2>WELCOME</h2>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="example@email.com"
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="●●●●●●●●"
        />
        <button type="submit">Log in</button>
        {error && <p className="error">{error}</p>}
        <p>New in InvBench? <a href="#">Let's get started!</a></p>
      </form>
    </div>
  );
};

export default Login;