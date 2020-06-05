const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const config = require("config");

const Booking = require("../../models/Booking");
const User = require("../../models/User");
const Serve = require("../../models/Serve");

// @route   POST api/bookings
// @desc    Create a booking
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const serve = await Serve.findById(req.body.serveId);
    if (!serve || serve.date < Date.now()) {
      return res.status(400).json({ errors: "Not a valid serve" });
    }
    const newBooking = new Booking({
      serve: req.body.serveId,
      requestedBy: req.user.id,
    });
    const booking = await newBooking.save();

    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.json(500).send("Server Error");
  }
});

module.exports = router;
