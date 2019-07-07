const request = require('request');

const forecast = (x, y, callback) => {
    const url = `https://api.darksky.net/forecast/c4446c801dbe1e8ea9685387b39ff2d9/${x},${y}?units=si`
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined);
        } else if (body.error) {
            callback('Unable to find location!', undefined);
        } else {
            const data = body.currently;
            callback(undefined, body.daily.data[0].summary + ` It is currently ${data.temperature} degrees out. There is a ${data.precipProbability}% chance of rain. 
            The minimum temperature of today is ${body.daily.data[0].temperatureMin} degrees and the maximum is ${body.daily.data[0].temperatureMax} degrees.`);
        }
    })
}

module.exports = forecast;
