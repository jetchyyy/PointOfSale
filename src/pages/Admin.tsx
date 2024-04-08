import React, { useState } from "react";
import { Form, Button, Container, Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BiketopiaLogo from "../../public/imgs/Bikelogo.png";

const AdminLogin = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);

    if (username === "admin" && password === "12345678") {
      onLoginSuccess();
      navigate("/orderspage");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <Container className="mt-5">
      <Card className="mx-auto" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <div className="text-center">
            <Image
              src={BiketopiaLogo}
              alt="Biketopia Logo"
              style={{ maxHeight: "100px", marginBottom: "20px" }}
            />
          </div>
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

            <div className="text-center">
              <Button
                variant="primary"
                type="submit"
                style={{ marginTop: "10px", backgroundColor: "#31363F" }}
                
              >
                Login
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminLogin;
