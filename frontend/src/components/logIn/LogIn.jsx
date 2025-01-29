import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import "./LogIn.css";

const Login = ({ onLogin }) => { // Asegúrate de recibir la prop onLogin
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Instancia de useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      // Guardar el token
      const token = response.data.token;
      localStorage.setItem("authToken", token);

      // Notificar al estado global que el usuario está autenticado
      onLogin(); 

      // Redirigir sin recargar
      navigate("/"); 
    } catch (error) {
      setError(error.response?.data?.message || "Log in error.");
    }
  };

  return (
    <div className="loginForm">
      <form onSubmit={handleSubmit}>
        <h2>Sign in</h2>
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