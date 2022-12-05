const Weather = require('../../model/weather_model');

exports.getWeatherData = (req, res) => {
    Weather.getData(req.query.lat, req.query.long, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving data"
            });
        } else {
            if (data.length != 0) res.render('index', {
                data
            });
            else {
                res.status(404).send({
                    message: "Couldn't find any weather data"
                })
            }
        }
    });
};

exports.searchData = (req, res) => {
    Weather.searchData(req.query.city, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occured while retrieving data"
            });
        } else {
            if (data.length != 0) res.render('search', {
                data
            });
            else {
                res.status(404).send({
                    message: "Couldn't find any weather data"
                })
            }
        }
    });
};