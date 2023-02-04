const request = require('request')

const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        encodeURIComponent(adress) +
        '.json?access_token=pk.eyJ1IjoibmV5YWxvOTk1OCIsImEiOiJjbGN6Z3BpbW4wYXE4M3FxbzMwMGJ4cGhzIn0.n9Whz-pp0zLe54JTRgaSwA&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(error, undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitute: body.features[0].center[1],
                longitute: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode