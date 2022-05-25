const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f12151d9625bca3e432bb22ea3b82e62&query=' + lat + ',' + lon + '&units=f'
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather API', undefined)
        } else if (body.error) {
            callback('Error ' + body.error.code + ': ' + body.error.info, undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast