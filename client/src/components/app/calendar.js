import {React, useContext, useState, useEffect} from "react";
import { GlobalStoreContext } from '../../store/index.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Calendar = () => {

    const { store } = useContext(GlobalStoreContext);

    const [date, setDate] = useState(new Date());
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useEffect(() => {
        const interval = setInterval(() => setDate(new Date()), 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    let body = "";

    if(!store.hasOwnProperty("new_app")){

        let hour = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hour >= 12 ? "PM" : "AM";

        hour = hour % 12
        hour = hour == 0 ? 12 : hour;
        minutes = minutes < 10 ? "0" + minutes : minutes;

        let today = days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate();

        body = <Container>
                    <Row>
                        <Col md="6" id="hour">{hour}</Col>
                        <Col md="6">
                            <Row id="stacked-minutes">
                                <Col md="12" id="minutes">{minutes}</Col>
                                <Col md="12" id="ampm">{ampm}</Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12" id="today">{today}</Col>
                    </Row>
                </Container>;
    }

    return(
            <div id="calendar-app" class="app-body">
                {body}
            </div>
    )

}

export default Calendar;