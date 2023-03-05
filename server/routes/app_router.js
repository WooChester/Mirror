const express = require('express');
const WeatherController = require('../controllers/weather_controller');
const MusicController = require('../controllers/music_controller');
const router = express.Router();


router.get('/weather/:location', WeatherController.getWeather);

router.get('/music/login', MusicController.login);
router.get('/music/callback', MusicController.callback);
router.get('/music/current_song/:access_token', MusicController.getCurrentSong);

router.get(`/callback`, (req, res) => { console.log(req); console.log(res); })

module.exports = router;