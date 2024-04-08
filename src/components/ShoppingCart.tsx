import React, { useState, ChangeEvent } from "react";
import { Offcanvas, Stack, Button, Modal } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import storeItems from "../data/items.json";
import helmets from "../data/helmets.json";
import shoesItems from "../data/shoes.json";
import {
  MenuItem,
  TextField,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

type User = {
  Name: string;
  Email: string;
  Number: string;
  Address: string;
  PaymentMode: string;
  InputDate: string;
};

type CartItem = {
  id: string;
  quantity: number;
};

type ShoppingCartProps = {
  isOpen: boolean;
};

type ModalProps = {
  user: User;
  data: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name: string; value: string }>) => void;
  handleCheckout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems, clearCart } = useShoppingCart();
  const [user, setUser] = useState<User>({
    Name: "",
    Email: "",
    Number: "",
    Address: "",
    PaymentMode: "",
    InputDate: "",
  });

  const calculateTotal = (): number => {
    return cartItems.reduce((total, cartItem) => {
      const item =
        storeItems.find((i) => i.id === cartItem.id) ||
        helmets.find((i) => i.id === cartItem.id) ||
        shoesItems.find((i) => i.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0);
  };

  const handleCheckout = async (): Promise<void> => {
    const { Name, Email, Number, Address, PaymentMode } = user;
    if (!Name || !Email || !Number || !Address || !PaymentMode) {
      alert("Please fill in all required fields.");
      return;
    }

    const allItems = [...storeItems, ...helmets, ...shoesItems];

    const cartData = cartItems.map((cartItem) => {
      const item = allItems.find((i) => i.id === cartItem.id);
      if (!item) {
        console.error("Item not found for cartItem:", cartItem);
        return null;
      }
      return {
        itemId: cartItem.id,
        itemName: item.name,
        quantity: cartItem.quantity,
        totalPrice: (item.price || 0) * cartItem.quantity,
      };
    });

    const orderData = {
      user: {
        ...user,
        InputDate: new Date().toISOString(),
      },
      items: cartData,
    };

    try {
      const response = await fetch(
        "https://point-of-sale-59331-default-rtdb.firebaseio.com/UserData.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (response.ok) {
        alert(
          "Your order has been placed successfully! For the status update of your order a message from our facebook page will be sent to you. Thank you for choosing Biketopia"
        );
        closeCart();
        setUser({
          Name: "",
          Email: "",
          Number: "",
          Address: "",
          PaymentMode: "",
          InputDate: "",
        });
        clearCart();
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  const data = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name: string; value: string }>): void => {
    const name = e.target.name;
    let value = e.target.value;

    if (name === "Number") {
      value = value.replace(/\D/g, "");
    }
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
            <ModalComponent
              user={user}
              data={data}
              handleCheckout={handleCheckout}
              setUser={setUser}
            />
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function ModalComponent({ user, data, handleCheckout, setUser }: ModalProps) {
  const [show, setShow] = useState(false);

  const currencies = [
    {
      value: "Cash on Delivery",
      label: "Cash on Delivery",
    },
    {
      value: "Gcash",
      label: "Gcash",
    },
  ];
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleClose = (): void => setShow(false);
  const handleShow = (): void => setShow(true);

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
                  error={!isValidEmail(user.Email)}
                  helperText={
                    !isValidEmail(user.Email)
                      ? "Please input a valid email"
                      : ""
                  }
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
                <FormControl style={{ margin: "10px" }} fullWidth>
                  <InputLabel id="payment-mode-label">
                    Mode of Payment
                  </InputLabel>
                  <Select
                    labelId="payment-mode-label"
                    id="payment-mode"
                    value={user.PaymentMode}
                    label="Mode of Payment"
                    onChange={(e) =>
                      setUser({ ...user, PaymentMode: e.target.value })
                    }
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
    </>
  );
}

export default ShoppingCart;
