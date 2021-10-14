const request = require('request')


const forecast = (latitude, longitude, callback) =>  {

    const url = 'http://api.weatherstack.com/current?access_key=10edcd84ec1d2532758bd9a8c3e7c4a8&query=' + latitude + ',' + longitude + '&units=m'

    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'The weather is ' + body.current.weather_descriptions[0] + ' and the temprature is ' + body.current.temperature + ', feels like ' + body.current.feelslike + '.')
        }
    })

}


module.exports = forecast


