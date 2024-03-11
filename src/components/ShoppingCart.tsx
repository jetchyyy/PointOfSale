import React, { useState } from 'react';
import { Offcanvas, Stack, Button, Modal, Toast } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import storeItems from "../data/items.json";

import { MenuItem, TextField } from '@mui/material';

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [user, setUser] = useState({
    Name: "",
    Email: "",
    Number: "",
    Address: "",
  });
  const [isModalOpen, setModalState] = React.useState(false);

  const toggleModal = () => setModalState(!isModalOpen);
  const calculateTotal = () => {
    return cartItems.reduce((total, cartItem) => {
      const item = storeItems.find((i) => i.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0);
  };

  const handleCheckout = async () => {
    const { Name, Email, Number, Address } = user;
    const cartData = cartItems.map(cartItem => {
      const item = storeItems.find(i => i.id === cartItem.id);
      return {
        itemId: cartItem.id,
        itemName: item.name,
        quantity: cartItem.quantity,
        totalPrice: (item.price || 0) * cartItem.quantity
      };
    });
    const orderData = {
      user: {
        Name,
        Email,
        Number,
        Address
      },
      items: cartData
    };

    try {
      const response = await fetch('https://point-of-sale-59331-default-rtdb.firebaseio.com/UserData.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        setCheckoutModalOpen(false);
        // Clear cart after successful checkout
        //setCart([]);
        // Close the modal
        toggleModal();
        // Show success message to the user
        alert('Your order has been placed successfully!');
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  const handleCloseCheckoutModal = () => {
    setCheckoutModalOpen(false);
  };

  const data = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
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
            <Modalcomponent user={user} data={data} handleCheckout={handleCheckout}/>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function Modalcomponent({ user, data, handleCheckout }) {
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const currencies = [
    {
      value: "USD",
      label: "Cash",
    },
    {
      value: "EUR",
      label: "Gcash",
    },
  ];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        style={{
          backgroundColor: "black",
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
        onClick={handleShow}
      >
        Checkout
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <TextField
                  id="filled-basic"
                  label="Full Name"
                  name="Name"
                  value={user.Name}
                  variant="filled"
                  required
                  onChange={data}
                  style={{ margin: "10px" }}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  id="filled-basic"
                  label="Email Address"
                  name="Email"
                  value={user.Email}
                  variant="filled"
                  required
                  onChange={data}
                  style={{ margin: "10px" }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <TextField
                  id="filled-basic"
                  label="Contact Number"
                  name="Number"
                  value={user.Number}
                  variant="filled"
                  required
                  onChange={data}
                  style={{ margin: "10px" }}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  id="filled-basic"
                  label="Current Address"
                  name="Address"
                  value={user.Address}
                  variant="filled"
                  required
                  onChange={data}
                  style={{ margin: "10px" }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Mode of Payment"
                  defaultValue="USD"
                  helperText="Please select mode of payment"
                  style={{ margin: "10px" }}
                >
                  {currencies.map((option) => (
                    <MenuItem
                      style={{
                        backgroundColor: "secondary",
                        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                      }}
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            style={{
              backgroundColor: "black",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
            onClick={handleClose}
          >
            Back
          </Button>
          <Button
            variant="primary"
            style={{
              backgroundColor: "black",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
            onClick={handleCheckout}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={10000}
        autohide={false}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "400px",
          fontSize: "1.2rem",
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Order Received</strong>
        </Toast.Header>
        <Toast.Body>
          We received your order! Check your email for the status of your order.
          Thank you!
        </Toast.Body>
      </Toast>
    </>
  );
}

export default Modalcomponent;
