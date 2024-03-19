import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; //Link
import { Toaster, toast } from 'react-hot-toast';
import { logout } from './api/auth';
import { checkAuth } from './api/auth';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Navbar from "./components/Navbar";
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = checkAuth();
    setIsLoggedIn(isLoggedIn);
}, []);

  const handleLogout = async () => {
    try {
        await logout();
        setIsLoggedIn(false);
        toast.success('Cierre de sesión exitoso');
    } catch (error) {
        toast.error('Error al cerrar la sesión');
    }
  };

  return (
    <>
      <Toaster />
      <Router>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />} />
          <Route path="/registro" element={!isLoggedIn ? <Registro /> : <Navigate to="/" />} />
        </Routes>

      </Router>
    </>
  );
}

export default App;