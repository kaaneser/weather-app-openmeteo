const router = require('express').Router();
const weatherService = require('../controller/weather/weather_service');

router.get('/index', weatherService.getWeatherData);
router.get('/search', weatherService.searchData);

module.exports = router;