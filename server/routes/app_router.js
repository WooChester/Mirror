const express = require('express')
const WeatherController = require('../controllers/weather_controller')
const router = express.Router()

router.get('/weather/:location', WeatherController.getWeather)

module.exports = router