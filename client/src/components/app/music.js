import {React, useContext, useState, useEffect} from "react";
import { GlobalStoreContext } from '../../store/index.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faFastForward, faFastBackward } from '@fortawesome/free-solid-svg-icons';

const Music = () => {

    const { store } = useContext(GlobalStoreContext);
    
    let body = "";

    if(!store.hasOwnProperty("new_app")){

        

        body = <Container>
                    <Row>
                        <Col md="12" id="song-title">After the Storm</Col>
                    </Row>
                    <Row>
                        <Col md="12" id="song-artist">Kali Uchis</Col>
                    </Row>
                    <Row>
                        <Col md="12" id="player-buttons">
                            <FontAwesomeIcon icon={ faFastBackward } size="2x"/>
                            <FontAwesomeIcon icon={ faPlay} size="2x"/>
                            <FontAwesomeIcon icon={ faFastForward } size="2x"/>
                        </Col>
                    </Row>
                </Container>;
    }

    return(
            <div id="music-app" class="app-body">
                {body}
            </div>
    )

}

export default Music;