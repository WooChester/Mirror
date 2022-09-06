import {React, useContext, useEffect} from "react";
import { GlobalStoreContext } from '../../store/index.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faSun, faTornado, faSnowflake, faCloudRain, faCloudBolt } from '@fortawesome/free-solid-svg-icons';

const Weather = () => {

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
        }

        let farenheit = (store.app_data.weather.main.temp * (9/5)) + 32;

        body = <Container>
                    <Row>
                        <Col md="6"><FontAwesomeIcon icon={ icon } size="3x"/></Col>
                        <Col md="6" className="app-text">{farenheit.toFixed(0)}&deg;C</Col>
                    </Row>
                    <Row>
                        <Col md="12" className="app-text" id="weather-name">{store.app_data.weather.name}</Col>
                    </Row>
                </Container>
    }

    return(
            <div id="weather-app">
                {body}
            </div>
    )

}

export default Weather;