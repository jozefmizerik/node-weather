const request = require("request");

function forecast(longitude, lattitude, callback) {
  const url = `https://api.darksky.net/forecast/5562cef97de68d90d33103b5b9e0d3a6/${longitude},${lattitude}?units=si&lang=sk`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("API unavailable");
    } else if (body.error) {
      callback("Incorrect input");
    } else {
      callback(null, {
        timezone: body.timezone,
        temperature: body.currently.temperature
      });
    }
  });
}

module.exports = {
  forecast
};
