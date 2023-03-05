import {React, useContext, useEffect} from "react";
import { GlobalStoreContext } from '../../store/index.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Marquee from "react-fast-marquee";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faFastForward, faFastBackward } from '@fortawesome/free-solid-svg-icons';

const Music = () => {

    const { store } = useContext(GlobalStoreContext);
    
    let body = "";
    
    const handleMusicToggle = () => {
        store.toggle_music();
    }

    const handleMusicNext = () => {
        store.next_song();
    }

    const handleMusicPrev = () => {
        store.prev_song();
    }

    useEffect(() => {
        const interval = setInterval(() => {store.init_music()}, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [store]);

    if(!store.hasOwnProperty("new_app")){

        if(store.app_data.music.tokens.access_token === null){
            body = <div><p><a href='http://localhost:4000/api/music/login'>Login into Spotify!</a></p></div>
        }
        else{
            console.log(store.app_data.music.current_song);
            if(store.app_data.music.current_song === null){
                body = <div><p>There is currently nothing playing</p></div>
            }
            else{
                let current_song = store.app_data.music.current_song;

                let title = current_song.item.name;
                let artist = current_song.item.artists[0].name;

                let play_status = current_song.is_playing ? faPause : faPlay;

                if(title.length > 15){
                    title = <Marquee
                                gradient={false}
                                speed="25"
                            >
                                {title}
                            </Marquee>;
                }
                if(artist.length > 15){
                    artist = <Marquee
                                gradient={false}
                                speed="25"
                            >
                                {artist}
                            </Marquee>
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
                                    <FontAwesomeIcon icon={ faFastBackward } size="2x" onClick={handleMusicPrev} />
                                    <FontAwesomeIcon icon={ play_status} size="2x" onClick={handleMusicToggle}/>
                                    <FontAwesomeIcon icon={ faFastForward } size="2x" onClick={handleMusicNext} />
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