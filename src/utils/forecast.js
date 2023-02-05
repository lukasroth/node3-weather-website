const request = require('request')

const forecast = (latitute, longitute, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6ada621d92ba96c314afc1257ce954b3&query=' + latitute + ',' + longitute // + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(error, undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(
                undefined,
                body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' +
                body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '%.'
            )
        }
    })
}

module.exports = forecast