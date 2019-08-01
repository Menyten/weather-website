const request = require('request');

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/d92c66f6e26bf2a3756b93683470efe6/${lat},${long}?units=si`;

  request({ url, json: true }, (err, res) => {
    const { body: { daily: { data }, currently: { temperature, precipProbability } } } = res;
    if (err) {
      callback('Unable to connect to weather service', undefined);
    } else if (res.body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, `${data[0].summary} It is currently ${temperature} degrees out. There is ${precipProbability}% chance of rain.`);
    }
  });
}

module.exports = forecast;