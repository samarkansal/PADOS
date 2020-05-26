const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Serve = require("../../models/Serve");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route      POST api/serves
// @desc       Create a serve
// @access     Private
router.post(
  "/",
  [
    auth,
    [
      check(
        [
          "fromLocation.name",
          "fromLocation.lat",
          "fromLocation.long",
          "toLocation.name",
          "toLocation.lat",
          "toLocation.long",
          "date",
          "maxWeight",
        ],
        "Missing Data"
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
      if (req.body.date <= Date.now()) {
        return res.status(400).json({ errors: "Date must be futuristic" });
      }

      const {
        fromLocation,
        toLocation,
        date,
        note,
        maxWeight,
        isAvailable,
        betweenStopovers,
        stopovers,
      } = req.body;

      const user = await User.findById(req.user.id).select("-password");

      const newServe = new Serve({
        note,
        fromLocation,
        toLocation,
        date,
        maxWeight,
        betweenStopovers,
        isAvailable,
        user: req.user.id,
      });

      const serve = await newServe.save();

      res.json(serve);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/serves
// @desc    Get all serves
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const serves = await Serve.find().sort({ date: -1 });
    res.json(serves);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/serves/:id
// @desc    Get serve by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const serve = await Serve.findById(req.params.id);

    if (!serve) {
      return res.status(404).json({ msg: "Serve not found" });
    }

    res.json(serve);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Serve not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/serves/:id
// @desc    Delete a serve
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const serve = await Serve.findById(req.params.id);
    // check if serve exist
    if (!serve) {
      return res.status(404).json({ msg: "Serve not found" });
    }
    // Check user
    if (serve.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await serve.remove();

    res.json({ msg: "Serve Removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Serve Not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   Put api/serve/:serve_id/:stopOver
// @desc    add stopOver into a serve
// @access  Private
router.put("/:serve_id/stopover", auth, async (req, res) => {
  try {
    const serve = await Serve.findById(req.params.serve_id);

    if (!serve) {
      return res.status(404).json({ msg: "Serve Not Found" });
    }
    if (serve.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User Not authorized" });
    }
    const { name, long, lat } = req.body;

    const newStopover = {
      name,
      long,
      lat,
    };
    serve.stopovers.push(newStopover);

    await serve.save();

    res.json(serve);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Serve not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
