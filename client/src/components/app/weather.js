import {React, useContext} from "react";
import { GlobalStoreContext } from '../../store/index.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faSun, faTornado, faSnowflake, faCloudRain, faCloudBolt } from '@fortawesome/free-solid-svg-icons';

const Weather = ({app}) => {

    const { store } = useContext(GlobalStoreContext);

    let body = <p>Loading Weather...</p>;

    if(store.app_data.weather.main && !store.hasOwnProperty("new_app")){

        let icon;
        switch(store.app_data.weather.weather[0].main){
            case "Clouds":
            case "Ash":
            case "Dust":
            case "Sand":
            case "Fog":
            case "Haze":
            case "Smoke":
                icon = faCloud;
                break;
            case "Clear":
                icon = faSun;
                break;
            case "Tornado":
                icon = faTornado;
                break;
            case "Squall":
            case "Thunderstorm":
                icon = faCloudBolt;
                break;
            case "Snow":
                icon = faSnowflake;
                break;
            case "Rain":
            case "Drizzle":
                icon = faCloudRain;
                break;
            default:
                icon = faCloud;
        }

        let farenheit = ((store.app_data.weather.main.temp * (9/5)) + 32).toFixed(0);

        let basic = <Container>
                    <Row>
                        <Col md="6"><FontAwesomeIcon icon={ icon } size="3x"/></Col>
                        <Col md="6" className="app-text">{farenheit}&deg;F</Col>
                    </Row>
                    <Row>
                        <Col md="12" className="app-text" id="weather-name">{store.app_data.weather.name}</Col>
                    </Row>
                </Container>

        if(app.settings.shape != "square"){

            let feels_like = ((store.app_data.weather.main.feels_like * (9/5)) + 32).toFixed(1);
            let pressure = store.app_data.weather.main.pressure;
            let humidity = store.app_data.weather.main.humidity;

            let wind = (store.app_data.weather.wind.speed * 2.23694).toFixed(1);
            let wind_direction = store.app_data.weather.wind.deg;
            const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
            wind_direction = directions[Math.floor((wind_direction + 22.5) / 45)];

            body = <Container>
                        <Row>
                            <Col md="4">
                                <div id="weather_basic" className="app-basic">
                                    {basic}
                                </div>
                            </Col>
                            <Col md="8">
                                <div id="weather_extended">

                                    <Row>
                                        <Col md="7" className="weather-extended-title">
                                            <h4>Feels Like:</h4>
                                        </Col>
                                        <Col md="5" className="weather-extended-data">
                                            <h4>{feels_like}&deg; F</h4>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md="7" className="weather-extended-title">
                                            <h4>Humidity:</h4>
                                        </Col>
                                        <Col md="5" className="weather-extended-data">
                                            <h4>{humidity}</h4>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md="7" className="weather-extended-title">
                                            <h4>Wind:</h4>
                                        </Col>
                                        <Col md="5" className="weather-extended-data">
                                            <h4>{wind}mph {wind_direction}</h4>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md="7" className="weather-extended-title">
                                            <h4>Pressure:</h4>
                                        </Col>
                                        <Col md="5" className="weather-extended-data">
                                            <h4>{pressure}</h4>
                                        </Col>
                                    </Row>

                                </div>
                            </Col>
                        </Row>
                    </Container>
        }
        else{
            body = basic;
        }
    }

    return(
            <div id="weather-app" className="app-body">
                {body}
            </div>
    )

}

export default Weather;