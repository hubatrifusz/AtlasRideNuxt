const express = require("express");
const Ride = require("../models/Ride");

const router = express.Router();

// POST
router.post("/", async (req, res) => {
  try {
    const newRide = new Ride(req.body);
    const savedRide = await newRide.save();
    res.status(201).json(savedRide);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ALL
router.get("/", async (req, res) => {
  try {
    const rides = await Ride.find();
    res.json(rides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE ALL
router.delete("/", async (req, res) => {
  try {
    await Ride.deleteMany();
    res.json({ message: "All items deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
