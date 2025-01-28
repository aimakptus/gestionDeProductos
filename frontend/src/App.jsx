import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Login from "./components/logIn/LogIn";
import Register from "./components/Register/Register"; // Importar el formulario de registro
import Home from "./components/logIn/LogIn"; // Cambié a la ruta correcta
import Footer from "./components/footer/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Ruta para registro */}
        <Route path="/" element={<Home />} /> {/* Página principal */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;