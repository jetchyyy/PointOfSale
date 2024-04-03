import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from "../components/Sidebar";

const AdminHome = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication state on page load
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    // Clear authentication state from storage
    localStorage.removeItem('isLoggedIn');
    // Update local state
    setIsLoggedIn(false);
  };

  return (
    <Container>
      <Row>
        
          <Sidebar />
        
        <Col md={10}>
          <main role="main" className="ml-sm-auto px-md-4">
            <Container className="mt-5">
              <h2>Welcome to Admin Dashboard</h2>
              <Row>
                <Col>
                  <p>This is the landing page content.</p>
                  
                </Col>
              </Row>
            </Container>
          </main>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHome;
