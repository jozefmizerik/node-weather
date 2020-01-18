const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYmllbGQiLCJhIjoiY2s1Y293ejYyMDN2cTNmczAxejlub2ptaSJ9.YtFiRc8rxPyv7rWHq_qT3g&limit=1`;
  request({ url, json: true }, (error, { body: { features } }) => {
    if (error) {
      callback("Unable to connect to API");
    } else if (features.length === 0) {
      callback("Incorrect input");
    } else {
      callback(null, {
        lattitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].place_name
      });
    }
  });
};

module.exports = { geocode };
