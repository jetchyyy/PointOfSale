import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { StoreItem } from "./StoreItem"; // Importing the StoreItem component
import helmetItems from "../data/helmets.json";
import { Link } from "react-router-dom";

const Helmets = () => {
  const { increaseCartQuantity } = useShoppingCart(); // Only need the increaseCartQuantity function

  return (
    <>
      <div className="container">
        <h2 className="mt-4 mb-3">Helmets</h2>
        <p>
        <Button
           as={Link} 
            to="/store"
            variant="outlined"
            style={{ textDecoration: "none", marginRight: "10px", color:"#344955", borderColor:"#344955"  }}
          >
            Back
          </Button>
        </p>
        <Row md={4} xs={4} className="g-4">
          {helmetItems.map((item) => (
            <Col key={item.id}>
              <StoreItem // Use the StoreItem component
                id={item.id}
                name={item.name}
                price={item.price}
                imgUrl={item.imgUrl}
                category={item.category}
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Helmets;
