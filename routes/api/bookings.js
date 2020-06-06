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

//  @route  Put api/bookings/transition/:serve_id/:state
//  @desc   Change the state of a booking to 'state'
//  @access Serve Owner
router.put("/transition/:booking_id/:state", auth, async (req, res) => {
  try {
    const booking_id = req.params.booking_id;
    const booking = await Booking.findById(booking_id);
    if (!booking) {
      return res.status(404).json({ msg: "Booking Not Found" });
    }
    const serve = await Serve.findById(booking.serve);
    if (!serve) {
      return res.status(404).json({ msg: "Serve not valid" });
    }
    if (req.user.id !== serve.user.toString()) {
      return res.status(404).json({ msg: "User not Authorized" });
    }

    booking.state = req.params.state;

    await booking.save();

    res.json(booking);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Booking Not Found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
