import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AdminLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform authentication logic here, for demo purposes just log the credentials
    console.log("Username:", username);
    console.log("Password:", password);

    // Example of basic authentication logic - replace this with your actual logic
    if (username === "admin" && password === "password") {
      // Call onLoginSuccess to handle successful login
      onLoginSuccess();
      // Navigate to AdminHome
      navigate("/adminhome");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Admin Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default AdminLogin;
