import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./LogIn.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      // Guardar el token en el almacenamiento local
      localStorage.setItem("authToken", response.data.token);

      // Redirigir al usuario (puedes redirigir al home o dashboard)
      window.location.href = "/"; // O usar React Router para redirigir
    } catch (error) {
      setError(error.response?.data?.message || "Log in error.");
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
        <p>New in InvBench? <Link to="/register">Let's get started!</Link></p>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;