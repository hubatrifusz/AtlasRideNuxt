const mongoose = require("mongoose");

const RideSchema = new mongoose.Schema({
  lastname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  baggage: {
    type: Boolean,
  },
  return: {
    type: Boolean,
  },
  time: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  passangerNumber: {
    type: Number,
  },
  dogNumber: {
    type: Number,
  },
  box: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Ride", RideSchema);
