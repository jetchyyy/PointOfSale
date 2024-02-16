import { TextField } from '@mui/material';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';


function Modalcomponent() {
  const [show, setShow] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    contactNumber: '',
    currentAddress: '',
    modeOfPayment: 'USD',
    dateOfBooking: dayjs('2022-04-17'),
  });
  const currencies = [
    {
      value: 'USD',
      label: 'Cash',
    },
    {
      value: 'EUR',
      label: 'Gcash',
    },
    
  ];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirm = async () => {
    // Send an HTTP request to your server with formData
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Handle the response, show success message, etc.
      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }

    handleClose();
  };

  const handleChange = (fieldName, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Checkout
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Booking Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  <div className="container">
    <div className="row">
      <div className="col-md-6">
        <TextField id="filled-basic" label="Full Name" variant="filled" style={{ margin: '10px' }} />
      </div>
      <div className="col-md-6">
        <TextField id="filled-basic" label="Email Address" variant="filled" style={{ margin: '10px' }} />
      </div>
    </div>

    <div className="row">
      <div className="col-md-6">
        <TextField id="filled-basic" label="Contact Number" variant="filled" style={{ margin: '10px' }} />
      </div>
      <div className="col-md-6">
        <TextField id="filled-basic" label="Current Address" variant="filled" style={{ margin: '10px' }} />
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
          style={{ margin: '10px' }}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="col-md-6">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateField', 'DateField']}>
        <DateField
          label="Date of Booking"
          defaultValue={dayjs('2022-04-17')}
          format="LL"
        />
      </DemoContainer>
    </LocalizationProvider>
      </div>
    </div>
  </div>
</Modal.Body>

  
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Back
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modalcomponent;