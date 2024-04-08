import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { StoreItem } from "./StoreItem";
import shoesItems from "../data/shoes.json";
import { Link } from "react-router-dom";


const Shoes = () => {
  const { increaseCartQuantity } = useShoppingCart();

  return (
    <div className="container">
      <h2 className="mt-4 mb-3">Shoes</h2>
      <p>
      <Button
           as={Link} 
            to="/store"
            variant="contained"
            style={{ textDecoration: "none", marginRight: "10px", color:"#344955", borderColor:"#344955"  }}
          >
            Back
          </Button>
      </p>
      <Row md={4} xs={4} className="g-4">
        {shoesItems.map((item) => (
          <Col key={item.id}>
            <StoreItem
              id={item.id}
              name={item.name}
              price={item.price}
              imgUrl={item.imgUrl} category={""}            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Shoes;
