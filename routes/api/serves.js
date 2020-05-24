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
      } = req.body;

      const user = await User.findById(req.user.id).select("-password");

      const newServe = new Serve({
        note,
        fromLocation,
        toLocation,
        date,
        maxWeight,
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

module.exports = router;
