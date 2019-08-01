const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoiam9lbG1vc2VuIiwiYSI6ImNqeDRweGdnczBiNDI0OXBqaG9sYzNtdXgifQ.m0zpxq3TXeogMsXyc7x70g`;

  request({ url, json: true }, (err, res) => {
    const { body: { features } } = res;
    if (err) {
      callback('Unable to connect to location services!', undefined);
    } else if (!res.body.features.length) {
      callback('Unable to find location. Try another search', undefined);
    } else {
      callback(undefined, {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].place_name
      });
    }
  });
}

module.exports = geocode;