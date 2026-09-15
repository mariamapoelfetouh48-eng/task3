const request = require("request")
const keys = require("./keys")

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.weatherapi.com/v1/current.json?key=" + keys.weatherApiKey + "&q=" + latitude + "," + longitude

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (response.body.error) {
            callback("Unable to find location", undefined)
        } else {
            callback(undefined, {
                temperature: response.body.current.temp_c,
                country: response.body.location.country
            })
        }
    })
}

module.exports = forecast