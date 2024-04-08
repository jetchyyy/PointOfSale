import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsList } from "react-icons/bs";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import biketopiaLogo from "../../public/imgs/Biketopialogo.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import LogoutIcon from '@mui/icons-material/ExitToApp';

interface SidebarProps {
  handleLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ handleLogout }) => {
  // State to track sidebar open/close
  const [logoutDialogOpen, setLogoutDialogOpen] = useState<boolean>(false);

  const handleLogoutConfirmation = () => {
    setLogoutDialogOpen(true);
  };

  const handleCloseLogoutDialog = () => {
    setLogoutDialogOpen(false);
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setLogoutDialogOpen(false);
  };

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
        <Navbar.Brand href="/">
          <img
            src={biketopiaLogo}
            alt="Biketopia Logo"
            style={{ width: "150px", height: "auto", marginLeft:"30px" }}
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
              startIcon={<ShoppingCartIcon />}
            >
              Orders
            </Button>
            <Button
              component={Link}
              to="/completedorders"
              variant="outlined"
              style={{ margin: "5px", backgroundColor: "#31363F", color:"#ffff" }}
              startIcon={<CheckCircleOutlineIcon />}
            >
              Completed Orders
            </Button>
            <Button
              component={Link}
              to="/canceledorders"
              variant="outlined"
              style={{ margin: "5px", backgroundColor: "#31363F", color:"#ffff" }}
              startIcon={<CancelIcon />}
            >
              Canceled Orders
            </Button>
            <Button
              onClick={handleLogoutConfirmation}
              variant="contained"
              color="error"
              style={{ margin: "5px", marginLeft:"380px" }}
              startIcon={<LogoutIcon />} 
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Dialog open={logoutDialogOpen} onClose={handleCloseLogoutDialog}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          Are you sure you want to log out?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogoutDialog} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="error" variant="outlined">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Sidebar;
