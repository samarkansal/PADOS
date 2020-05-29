const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const getMinRouteDistance = require("../../util-functions/getMinRouteDistance");

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
        stopovers,
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
router.get("/", async (req, res) => {
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

// @route   GET api/serves/date/:date(inMilliseconds)
// @desc    Get all serves of a particular day
// @access  Private
router.get("/date/:date", async (req, res) => {
  try {
    // var dt = Date(req.params.date);
    // const dts = dt.toString();
    var mills = parseInt(req.params.date, 10);
    var fromDate = new Date(mills);
    fromDate.setHours(00, 00, 00);
    var toDate = new Date(mills);
    toDate.setHours(23, 59, 59);

    const serves = await Serve.find({
      date: { $lt: toDate, $gt: fromDate },
    }).sort({ date: 1 });
    // serves.find().sort({ date: -1 });
    //fromDate = fromDate.getTime();
    //toDate = toDate.getTime();
    //console.log(Date.now() + "++++");
    //console.log(fromDate + "::" + toDate);
    console.log(typeof serves);
    res.json(serves);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/serves/suitable/:date/:from_lat/:from_long/:from_deflection/:to_lat/:to_long/:to_deflection
// @desc    Get all serves such that location matches stopovers or lies in between them(if allowed)
// @access  Private
router.get(
  "/suitable/:date/:from_lat/:from_long/:from_deflection/:to_lat/:to_long/:to_deflection",
  async (req, res) => {
    try {
      const date = parseInt(req.params.date, 10);
      const fromLong = parseFloat(req.params.from_long);
      const fromLat = parseFloat(req.params.from_lat);
      const toLong = parseFloat(req.params.to_long);
      const toLat = parseFloat(req.params.to_lat);
      const fromDeflection = parseInt(req.params.from_deflection, 10);
      const toDeflection = parseInt(req.params.to_deflection, 10);

      var fromDate = new Date(date);
      fromDate.setHours(00, 00, 00);
      var toDate = new Date(date);
      toDate.setHours(23, 59, 59);

      //Get all serves of asked day
      const serves = await Serve.find({
        date: { $lt: toDate, $gt: fromDate },
      }).sort({ date: 1 });
      //console.log("before:" + typeof serves);
      var result = [];
      serves.forEach(async (myServe) => {
        if (!myServe.isAvailable) {
          return;
        }
        var toAdd = false;
        var latArr = [myServe.fromLocation.lat];
        var longArr = [myServe.fromLocation.long];
        for (var i = 0; i < myServe.stopovers.length; i++) {
          var cur_stopover = myServe.stopovers[i];
          latArr.push(cur_stopover.lat);
          longArr.push(cur_stopover.long);
        }
        latArr.push(myServe.toLocation.lat);
        longArr.push(myServe.toLocation.long);

        var totalStopovers = latArr.length;
        var pickUpPossible = false;
        var dropOffPossible = false;
        var pickInd = -1;
        var minDist;
        //If stopovers are within {fromDeflection} metres, pickUp is possible
        var retu = await getMinRouteDistance(
          fromLong,
          fromLat,
          longArr,
          latArr
        );
        pickInd = retu[1];
        minDist = retu[0];

        if (pickInd == -2) {
          throw "Google DistanceMatrix API error";
        }
        if (
          pickInd >= 0 &&
          pickInd < totalStopovers - 1 &&
          minDist <= fromDeflection
        ) {
          pickUpPossible = true;
        }
        console.log(minDist);

        // console.log("user: " + myServe.note + long);
      });
      res.json(serves);
      //console.log(typeof serves);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

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
// @desc    add stopover into a serve
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
