const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const request = require("request");
const config = require("config");

// @route      GET api/places/textQuery
// @desc       Get places from googleMapApi based on text(autocomplete)
// @access     Private

router.get("/textQuery/:place_name", (req, res) => {
  try {
    const options = {
      uri: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${
        req.params.place_name
      }&key=${config.get("googlePlacesKey")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };
    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No place found" });
      }

      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
