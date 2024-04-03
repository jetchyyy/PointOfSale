import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from "./Sidebar";
import { RealtimeData } from "./Orders";

function Orderspage(){
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
             <Sidebar handleLogout={handleLogout} />
            <Row>
                <Col md={2}>
                   
                </Col>
                <Col md={10}>
                    <main role="main" className="ml-sm-auto px-md-4">
                        <Container className="mt-5">
                            <h2>Welcome to Orders Page</h2>
                            <Row>
                                <Col>
                                    <p>This is the Orders page content.</p>
                                    
                                </Col>
                            </Row>
                            <RealtimeData />
                        </Container>
                    </main>
                </Col>
            </Row>
        </Container>
    );
}

export default Orderspage;