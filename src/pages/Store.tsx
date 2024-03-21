import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap"; // Remove Button import from react-bootstrap
import { StoreItem } from "../components/StoreItem";
import storeItems from "../data/items.json";
import Chatbot from "../utilities/Chatbot";
import Icon from "../utilities/Icon";
import Button from "@mui/material/Button"; // Import Button from Material-UI

const Store = () => {
  return (
    <>
      <h1>Biketopia</h1>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <h2
          style={{
            marginRight: "20px",
            textDecoration: "none",
            color: "blue",
            transition: "transform 0.5s", // Add transition for smooth effect
            display: "inline-block", // Ensure the link behaves like a block element
          }}
        >
          <Link
            to="/helmets"
            style={{
              textDecoration: "none",
              color: "black",
              display: "inline-block",
              pointerEvents: "none",
              cursor: "default",
            }}
          >
            All items
          </Link>
        </h2>
        <div
          style={{
            overflowX: "auto",
            whiteSpace: "nowrap",
            transition: "transform 0.5s",
            display: "inline-block",
          }}
        >
          
          <Button
            component={Link} 
            to="/helmets"
            variant="contained" 
            style={{ textDecoration: "none", marginRight: "10px", backgroundColor:"#344955", fontWeight:"bold"}}
          >
            Helmets
          </Button>
          {/* Repeat for other links */}
          <Button
            component={Link}
            to="/shoes"
            variant="contained"
            style={{ textDecoration: "none", marginRight: "10px",fontWeight:"bold", backgroundColor:"#344955"}}
          >
            Cycling Shoes
          </Button>
          {/* <Button component={Link} to="/link3" style={{ textDecoration: 'none', marginRight: '10px' }}>Link 3</Button>
           Add more links as needed */}
        </div>
      </div>
      <Row md={2} xs={2} lg={4} className="g-3">
        {storeItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
      <Icon />
    </>
  );
};

export default Store;
