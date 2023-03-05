import {React, useContext, useEffect} from "react";
import { GlobalStoreContext } from '../../store/index.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Marquee from "react-fast-marquee";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faFastForward, faFastBackward } from '@fortawesome/free-solid-svg-icons';

const Music = () => {

    const { store } = useContext(GlobalStoreContext);
    
    let body = "";

    useEffect(() => {
        const interval = setInterval(() => store.init_music(), 2000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    if(!store.hasOwnProperty("new_app")){

        if(store.app_data.music.tokens.access_token === null){
            body = <div><p><a href='http://localhost:4000/api/music/login'>Login into Spotify!</a></p></div>
        }
        else{
            if(!store.app_data.music.current_song){
                body = <div><p>There is currently nothing playing</p></div>
            }
            else{
                let current_song = store.app_data.music.current_song;

                let title = current_song.item.name;
                let artist = current_song.item.artists[0].name;

                if(title.length > 15){
                    title = <Marquee
                                gradient={false}
                                speed="25"
                            >
                                {title}
                            </Marquee>;
                }

                body = <Container>
                            <Row>
                                <Col md="12" id="song-title">{title}</Col>
                            </Row>
                            <Row>
                                <Col md="12" id="song-artist">{artist}</Col>
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
        }

    }

    return(
            <div id="music-app" className="app-body">
                {body}
            </div>
    )

}

export default Music;