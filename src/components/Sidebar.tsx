import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsList } from "react-icons/bs";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material"; // Importing Button from Material-UI
import biketopiaLogo from "../../public/imgs/Biketopialogo.png";

const Sidebar = ({ handleLogout }) => {
  // State to track sidebar open/close
  const isOpen = true; // Always open

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 1000 }}>
      <Navbar
        expand="lg"
        style={{
          backgroundColor: "#f8f9fa",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          width: "100%", // Set the width to 100%
        }}
      >
        {/* Always display the list icon */}
        <IconButton style={{ marginRight: "20px" }}>
          <BsList size={30} />
        </IconButton>
        <Navbar.Brand href="/">
          <img
            src={biketopiaLogo}
            alt="Biketopia Logo"
            style={{ width: "150px", height: "auto" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Button
              component={Link}
              to="/orderspage"
              variant="contained"
              style={{ margin: "5px", backgroundColor: "#31363F" }}
            >
              Orders
            </Button>
            <Button
              component={Link}
              to="/completedorders"
              variant="outlined"
              style={{ margin: "5px", backgroundColor: "#31363F", color:"#ffff" }}
            >
              Completed Orders
            </Button>
            <Button
              component={Link}
              to="/canceledorders"
              variant="outlined"
              style={{ margin: "5px", backgroundColor: "#31363F", color:"#ffff" }}
            >
              Canceled Orders
            </Button>
            <Button
              onClick={handleLogout}
              variant="contained"
              color="error"
              style={{ margin: "5px", }}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Sidebar;
