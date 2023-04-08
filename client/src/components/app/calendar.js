import {React, useContext, useState, useEffect} from "react";
import { GlobalStoreContext } from '../../store/index.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Calendar = ({app}) => {

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

        let basic = <Container>
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

        if(app.settings.shape != "square"){

            let events = [];

            if(Object.keys(store.app_data.calendar).length == 0){
                events.push(<li>You have no upcoming events!</li>)
            }
            else{
                for(let i = 0; i < store.app_data.calendar.length; i++){
                    let event = store.app_data.calendar[i];
                    let start_time = new Date(event.start.dateTime);

                    console.log(event.summary);
                    events.push(<li>{event.summary} @{start_time.toDateString()}</li>)
                }
            }

            body = <Container>
                        <Row>
                            <Col md="4">
                                <div id="calendar-basic" className="app-basic">
                                    {basic}
                                </div>
                            </Col>
                            <Col md="8">
                                <ul id="events-list">
                                    {events}
                                </ul>
                            </Col>
                        </Row>
                    </Container>;
        }
        else{
            body = basic;
        }

    }

    return(
            <div id="calendar-app" className="app-body">
                {body}
            </div>
    )

}

export default Calendar;