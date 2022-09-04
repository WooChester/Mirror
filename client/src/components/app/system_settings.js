import {React, useContext, useState} from "react";
import { GlobalStoreContext } from '../../store/index.js';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SystemSettings = () => {
    const { store } = useContext(GlobalStoreContext);

    const [defaultShape, setDefaultShape] = useState(store.settings.default_shape);

    const changeDefaultSquare = function(){
        setDefaultShape("square");
    }

    const changeDefaultLong = function(){
        setDefaultShape("long");
    }

    const saveSettings = function(){
        store.save_settings({ default_shape: defaultShape });
    }


    return(
        <div id="system-settings">
            <h1>System Settings</h1>
            <div className="field-body">
                <div id="setting-default-box-shape" className="setting-row">
                    <Row className="align-items-center">
                        <Col md="4">
                            <label className="main-label">Default Box Shape</label>
                        </Col>
                        <Col md="8">
                            <Row>
                                <Col md="4">
                                    <input 
                                        type="radio" 
                                        value="square" 
                                        name="default-shape-input" 
                                        id="default-shape-square" 
                                        onChange={changeDefaultSquare}
                                    />
                                    <label 
                                        htmlFor="default-shape-square" 
                                        className={defaultShape === "square" ? "shape-selected" : ""}
                                    >
                                        <div className="setting-square-box"></div>
                                        Small Box
                                    </label>
                                </Col>
                                <Col md="8">
                                    <input 
                                        type="radio" 
                                        value="long" 
                                        name="default-shape-input" 
                                        id="default-shape-long"
                                        onChange={changeDefaultLong}
                                    />
                                    <label 
                                        htmlFor="default-shape-long" 
                                        className={defaultShape === "long" ? "shape-selected" : ""}
                                    >
                                        <div className="setting-long-box"></div>
                                        Long Box
                                    </label>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
            <div id="app-setting-footer">
                <Row>
                    <Col>
                        <input type="button" value="Close" onClick={saveSettings}/>
                    </Col>
                </Row>
            </div>
        </div>
    );

}

export default SystemSettings;