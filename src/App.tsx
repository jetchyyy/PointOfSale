import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Navbar } from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import Footer from "./components/Footer";
import Store from "./pages/Store";
import Helmets from "./components/Helmets";
import Shoes from "./components/Shoes";
import AdminHome from "./pages/AdminHome";
import AdminLogin from "./pages/Admin";
import Orderspage from "./components/Orderspage";
import CompletedOrders from "./components/CompletedOrders";
import Sidebar from "./components/Sidebar";
import CanceledOrders from "./components/CanceledOrders";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [completedOrders, setCompletedOrders] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Check for stored authentication information (replace with your logic)
    const storedUser = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedUser === "true");
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true"); // Store login state
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); // Remove stored login state
  };

  const isNavbarVisible = ![
    "/admin",
    "/adminhome",
    "/orderspage",
    "/completedorders",
    "/canceledorders",
  ].includes(location.pathname);

  return (
    <ShoppingCartProvider>
      {isNavbarVisible && <Navbar />}
      <Container className="mb-4">
        
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Protected routes (require login) */}
          <Route
            path="/adminhome"
            element={
              isLoggedIn ? <AdminHome /> : <Navigate to="/admin" replace />
            }
          />
          <Route
            path="/orderspage"
            element={
              isLoggedIn ? (
                <Orderspage handleLogout={handleLogout} />
              ) : (
                <Navigate to="/admin" replace />
              )
            }
          />
          <Route
            path="/completedorders"
            element={
              isLoggedIn ? (
                <CompletedOrders
                  completedOrders={completedOrders}
                  handleLogout={handleLogout} // Pass handleLogout here
                />
              ) : (
                <Navigate to="/admin" replace />
              )
            }
          />
           <Route
            path="/canceledorders"
            
            element={
              isLoggedIn ? (<CanceledOrders
                canceledOrders={CanceledOrders}
                handleLogout={handleLogout} // Pass handleLogout here
              /> ):( <Navigate to="/admin" replace />)
            }
          />
          
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/helmets" element={<Helmets />} />
          <Route path="/shoes" element={<Shoes />} />
          <Route
            path="/admin"
            element={<AdminLogin onLoginSuccess={handleLoginSuccess} />}
          />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  );
}

export default App;
