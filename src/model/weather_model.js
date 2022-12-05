const axios = require('axios');
const fs = require('fs');

const Weather = function(weather) {
    this.city = weather.city;
    this.lat = weather.lat;
    this.long = weather.long;
    this.time = weather.time;
    this.temperature = weather.temperature;
}

Weather.getData = async (lat, long, result) => {    
    let jsonData =  JSON.parse(fs.readFileSync("src\\model\\cities.json"));
    
    var data = {};
    var keys = Object.keys(jsonData);
    for (let i = 0; i < keys.length; i++) {
        let endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${jsonData[keys[i]].lat}&longitude=${jsonData[keys[i]].long}&current_weather=true`

        var value = await axios.get(endpoint)
        data[keys[i]] = value;
        data[keys[i]]['image'] = await setForecastImage(data[keys[i]].data.current_weather.weathercode);
    }

    await result(null, data);
}

Weather.searchData = async (city, result) => {    
    let endpoint = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
    var data = {};


    var value = await axios.get(endpoint);
    data['search'] = value;

    let searchEndpoint = `https://api.open-meteo.com/v1/forecast?latitude=${data['search']['data']['results'][0]['latitude']}&longitude=${data['search']['data']['results'][0]['longitude']}&current_weather=true`
    var searchVal = await axios.get(searchEndpoint);

    data['result'] = searchVal;
    data['result']['image'] = await setForecastImage(data['result'].data.current_weather.weathercode);

    await result(null, data);
}

setForecastImage = async function(weathercode) {
    let imagesData = JSON.parse(fs.readFileSync("src\\model\\weather_img.json"));

    return imagesData[weathercode];
}

module.exports = Weather;