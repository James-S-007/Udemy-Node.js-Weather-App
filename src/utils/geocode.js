const request = require('request')

const geocode = (address, callback) => { 
    const mapbox_key = 'pk.eyJ1IjoiamFtZXNzMDA3IiwiYSI6ImNsM2thOWE4cTBhYzAzbHBnYWZtMHJrYmwifQ.h4ZfDiFu-bNDCtNpTv-yCQ'
    const query = '?access_token=' + mapbox_key + '&limit=1'
    const mapbox_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json' + query
    request({ url: mapbox_url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable to connect to geocoding API', undefined)
        } else if (body.features.length === 0) { 
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                lon: body.features[0].center[0],
                location: body.features[0].place_name 
            })
        }
    })
}

module.exports = geocode