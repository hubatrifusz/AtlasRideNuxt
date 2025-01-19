require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/send-email", async (req, res) => {
  const { to, subject, html } = req.body;

  try {
    // Create the transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.rackhost.hu",
      port: 465,
      secure: true, // true for port 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send the email
    const info = await transporter.sendMail({
      from: '"Atlas Ride" <info@atlasride.hu>', // Sender address
      to, // Recipient(s)
      subject, // Subject line
      html, // HTML body
    });

    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ message: "Email sent successfully", messageId: info.messageId });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;
