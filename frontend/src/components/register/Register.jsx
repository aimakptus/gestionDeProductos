import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Register.css";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", {
        fullName,
        email,
        password,
      });

      // Si el registro fue exitoso, mostrar mensaje de éxito
      setSuccess("Sign-up successful. You can now log in.");
      setError(""); // Limpiar errores
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError(error.response?.data?.message || "User registration failed.");
    }
  };

  return (
    <div className="registerForm">
      <form onSubmit={handleSubmit}>
        <h2>CREATE ACCOUNT</h2>
        <label>Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          placeholder="John Doe"
        />
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
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="●●●●●●●●"
        />
        <button type="submit">Sign Up</button>
        <p>Already have an account? <Link to="/">Log In!</Link></p>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default Register;