const config = require("config");
const fetch = require("node-fetch");

module.exports = async function (fromLong, fromLat, toLong, toLat) {
  const uri = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${fromLat},${fromLong}&destinations=${toLat},${toLong}&key=${config.get(
    "googlePlacesKey"
  )}`;
  const res = await fetch(uri);
  const json = await res.json();
  return json.rows[0].elements[0].distance.value;
};
