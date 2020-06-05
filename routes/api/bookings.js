const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const config = require("config");

const Booking = require("../../models/Booking");
const User = require("../../models/User");
const Serve = require("../../models/Serve");

// @route   POST api/bookings
// @desc    Create a booking
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check(
        [
          "note",
          "pickUp.name",
          "pickUp.lat",
          "pickUp.long",
          "dropOff.name",
          "dropOff.lat",
          "dropOff.long",
          "serveId",
        ],
        "Missing data"
      )
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const serve = await Serve.findById(req.body.serveId);
      if (!serve || serve.date < Date.now()) {
        return res.status(400).json({ errors: "Not a valid serve" });
      }
      const newBooking = new Booking({
        serve: req.body.serveId,
        requestedBy: req.user.id,
        pickUp: req.body.pickUp,
        dropOff: req.body.dropOff,
        note: req.body.note,
      });
      const booking = await newBooking.save();

      res.json(booking);
    } catch (err) {
      console.error(err.message);
      res.json(500).send("Server Error");
    }
  }
);

router.put("/");

module.exports = router;
