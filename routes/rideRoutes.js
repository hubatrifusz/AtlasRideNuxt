const express = require("express");
const Booking = require("../models/Booking");
const nodemailer = require("nodemailer");

const router = express.Router();

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.rackhost.hu",
  port: 465,
  secure: true, // true for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// GET ALL bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Create a new booking and send confirmation email
router.post("/", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();

    const emailData = {
      to: savedBooking.email,
      subject: "Atlas Ride ajánlatkérés visszaigazolás",
      html: `<div>
        <h2>Ajánlatkérés megerősítése – Köszönjük, hogy minket választott!</h2>
        <p>Kedves ${savedBooking.name}!</p>
        <p>Örömmel értesítjük, hogy az ajánlatkérése sikeresen rögzítésre került. Az alábbiakban találja a részleteket:</p>
        <p><strong>Az ajánlatkérés adatai:</strong></p>
        <ul>
            <li><strong>Indulás időpontja:</strong> ${
              savedBooking.departureDate
            }</li>
            <li><strong>Indulási hely:</strong> ${
              savedBooking.departureLocation
            }</li>
            <li><strong>Célállomás:</strong> ${
              savedBooking.destinationLocation
            }</li>
        </ul>
        <p>Bármilyen kérdés esetén: <b>info@atlasride.hu</b> vagy <b>+36 70 600 5522</b></p>
        <p>Üdvözlettel,<br>Atlas Ride</p>
      </div>`,
    };

    await transporter.sendMail({
      from: '"Atlas Ride" <info@atlasride.hu>',
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
    });

    res.status(201).json(savedBooking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// DELETE ALL bookings
router.delete("/", async (req, res) => {
  try {
    await Booking.deleteMany();
    res.json({ message: "All bookings deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
