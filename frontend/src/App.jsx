import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/header/Header";
import Login from "./components/logIn/LogIn";
import Register from "./components/register/Register";
import About from "./components/about/About";
import Footer from "./components/footer/Footer";
import Inventory from "./components/inventory/Inventory";
import "./App.css"

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
    setIsAuthenticated(false); // Cambia el estado global
    localStorage.removeItem("authToken");
  };

  return (
    <Router>
      <div className="mainHeader">
        {isAuthenticated && <Header onLogout={handleLogout} />} {/* Pasamos handleLogout */}
      </div>

      <div className="mainContainer">
        {!isAuthenticated && <About />}
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Inventory /> : <Login onLogin={() => setIsAuthenticated(true)} />}
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;