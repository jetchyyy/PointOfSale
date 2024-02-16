const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.post('/api/sendEmail', async (req, res) => {
  const { fullName, emailAddress, contactNumber, currentAddress, modeOfPayment, dateOfBooking } = req.body;

  // Create a nodemailer transporter using your email provider's settings
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  // Setup email data
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: emailAddress,
    subject: 'Booking Confirmation',
    text: `Thank you for booking. Details: ${fullName}, ${contactNumber}, ${currentAddress}, ${modeOfPayment}, ${dateOfBooking}`,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
