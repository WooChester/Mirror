const fetch = require("node-fetch");

getWeather = async (req, res) => {
    await fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=40.589409&lon=-73.665939&units=metric&APPID=ec7db399a8c578bb32c23f8d8173ff6e`)
    .then(res => res.json())  
    .then(result => {
        console.log(result);
        return res.status(200).json(result)
      }).catch(err => console.log(err))
}

module.exports = {
    getWeather
}