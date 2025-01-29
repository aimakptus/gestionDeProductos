import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Login from "./components/logIn/LogIn";
import Register from "./components/register/Register";
import About from "./components/about/About";
import Footer from "./components/footer/Footer";
import InventoryPage from "./components/inventoryPage/InventoryPage"; // Importa InventoryPage
import { ToastContainer } from "react-toastify"; // Importa ToastContainer
import "./assets/ReactToastify.css"; // Estilos de las notificaciones
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
  };

  return (
    <Router>
      <div className="mainHeader">
        {isAuthenticated && <Header onLogout={handleLogout} />}
      </div>

      <div className="mainContainer">
        {!isAuthenticated && <About />}
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <InventoryPage /> // Usa InventoryPage en lugar de Inventory y EditProduct
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      <Footer />

      {/* Agrega el ToastContainer para las notificaciones */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;