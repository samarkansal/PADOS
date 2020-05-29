const config = require("config");
const fetch = require("node-fetch");

module.exports = async function (fromLong, fromLat, toLong, toLat) {
  try {
    var cord = [];
    for (var i = 0; i < toLong.length; i++) {
      cord.push(toLat[i].toString() + "," + toLong[i].toString());
    }
    cord = cord.join("%7c");
    const uri = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${fromLat},${fromLong}&destinations=${cord}&key=${config.get(
      "googlePlacesKey"
    )}`;
    const res = await fetch(uri);
    const json = await res.json();
    //console.log(uri);
    var ret = Infinity;
    var ind = -3;
    for (var i = 0; i < json.rows[0].elements.length; i++) {
      //ret = min(ret, json.rows[0].elements[i].distance.value);
      if (ret > json.rows[0].elements[i].distance.value) {
        ret = json.rows[0].elements[i].distance.value;
        ind = i;
      }
    }
    //console.log(ret + "++" + ind);
    return [ret, ind];
  } catch (err) {
    console.error(err.message);
    return [Infinity, -2];
  }
};
