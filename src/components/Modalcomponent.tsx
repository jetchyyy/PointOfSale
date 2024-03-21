import { Select, TextField } from "@mui/material";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";
import MenuItem from "@mui/material/MenuItem";

function Modalcomponent() {
  const currencies = [
    {
      value: "Cash",
      label: "Cash",
    },
    {
      value: "Gcash",
      label: "Gcash",
    },
  ];
  
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [cart, setCart] = useState([]);
  const [formValid, setFormValid] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirm = async (e) => {
    e.preventDefault();
    console.log();

    try {
      setTimeout(() => {
        setCart([]);
        setShowToast(true);
        handleClose();
      }, 0);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const [user, setUser] = useState({
    Name: "",
    Email: "",
    Number: "",
    Address: " ",
    PaymentMode: "",
    
  });
  
  
  let name, value;
  console.log(user);
  const data = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
    // Check if all required fields are filled
    setFormValid(
      user.Name.trim() !== "" &&
      user.Email.trim() !== "" &&
      user.Number.trim() !== "" &&
      user.Address.trim() !== "" &&
      user.PaymentMode.trim() !== ""
    );
  };
  const { Name, Email, Number, Address, PaymentMode } = user;
  const getdata = async (e) => {
    e.preventDefault();
    if (!formValid) {
      alert("Please fill in all required fields.");
      return;
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name,
        Email,
        Number,
        Address,
        PaymentMode,
      }),
    };
    try {
      const res = await fetch(
        "https://point-of-sale-59331-default-rtdb.firebaseio.com/UserData.json",
        options
      );

      if (res.ok) {
        setShowToast(true);
        handleClose();
      } else {
        console.error("Failed to send data");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

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
                  defaultValue="Cash"
                  helperText="Please select mode of payment"
                  style={{ margin: "10px" }}
                  name="PaymentMode"
                  value={user.PaymentMode}
                  onChange={data}
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
            onClick={getdata}
            disabled={!formValid} // Disable the button when form is invalid
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <Toast className="toast"
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={10000} // 3000 milliseconds (3 seconds) delay
        autohide={false}
        style={{
          position: "fixed",
          top: "50%", // Set to 50% to center vertically
          left: "50%", // Set to 50% to center horizontally
          transform: "translate(-50%, -50%)", // Center the toast
          maxWidth: "400px", // Set the maximum width of the toast
          fontSize: "1.2rem", // Increase the font size
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
