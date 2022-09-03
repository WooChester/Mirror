import {React, useContext} from "react";
import { GlobalStoreContext } from '../../store/index.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLightbulb } from '@fortawesome/free-solid-svg-icons';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ModeBar = () => {

    const { store } = useContext(GlobalStoreContext);

    const toggleLight = () => {
        store.toggle_light();
    }

    const toggleLock = () => {
        store.toggle_lock();
    }   

    let modes = <Row className="align-items-center">
                    <Col md={{span: 6, offset: 1}}>
                        <div className="icon-box" onClick={toggleLock}>
                            <FontAwesomeIcon icon={ faLock } size="2x"/>
                        </div>
                        
                    </Col>
                    <Col md="5">
                        <div className={"icon-box" + (store.mode.light_mode ? " active-mode" : "")} onClick={toggleLight}>
                            <FontAwesomeIcon icon={ faLightbulb } size="2x"/>
                        </div>
                    </Col>
                </Row>;
    if(store.mode.lock_mode){
        modes = <Row className="align-items-center">
                    <Col md={{span: 11, offset: 1}}>
                        <div className="icon-box active-mode" onClick={toggleLock}>
                            <FontAwesomeIcon icon={ faLock } size="2x"/>
                        </div>
                        
                    </Col>
                </Row>
    }

    return(
        <Container>
            {modes}
        </Container>
    )
}

export default ModeBar;