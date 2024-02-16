import React, { useState } from 'react';
import { Offcanvas, Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import storeItems from "../data/items.json";
import Modalcomponent from './Modalcomponent';

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false); // Add this line
  const [isModalOpen, setModalState] = React.useState(false);

  const toggleModal = () => setModalState(!isModalOpen);
  const calculateTotal = () => {
    return cartItems.reduce((total, cartItem) => {
      const item = storeItems.find((i) => i.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    setCheckoutModalOpen(true);
    setModalState(true);
    toggleModal();
  };

  const handleCloseCheckoutModal = () => {  
    // Close the checkout modal
    setCheckoutModalOpen(false);
  };

  return (
    <>
       <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack gap={3}>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            <div className="ms-auto fw-bold fs-5">
              Total {formatCurrency(calculateTotal())}
            </div>
            <Modalcomponent/>

          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
