const fetch = require("node-fetch");

getWeather = async (req, res) => {
    await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=40.589409&lon=-73.665939&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
    .then(res => res.json())  
    .then(result => {
        console.log(result);
        return res.status(200).json(result)
      }).catch(err => console.log(err))
}

module.exports = {
    getWeather
}