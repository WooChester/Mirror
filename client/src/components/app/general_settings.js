import {React, useContext, useState} from "react";
import { GlobalStoreContext } from '../../store/index.js';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const GeneralSettings = () => {
    const { store } = useContext(GlobalStoreContext);
    const [shape, setShape] = useState(store.current_app.settings.shape);

    const changeShapeSquare = function(){
        setShape("square");
    }

    const changeShapeLong = function(){
        setShape("long");
    }

    const saveSettings = function(){
        let updated_app = store.current_app;
        updated_app.settings = {shape: shape};
        store.save_app( updated_app );
    }

    return(
        <div id="general-settings">
            <h1>General Settings</h1>
            <div className="field-body">
                <div id="setting-box-shape" className="setting-row">
                    <Row className="align-items-center">
                        <Col md="4">
                            <label className="main-label">Box Shape</label>
                        </Col>
                        <Col md="8">
                            <Row>
                                <Col md="4">
                                    <input 
                                        type="radio" 
                                        value="square" 
                                        name="shape-input" 
                                        id="shape-square" 
                                        onChange={changeShapeSquare}
                                    />
                                    <label 
                                        htmlFor="shape-square" 
                                        className={shape === "square" ? "shape-selected" : ""}
                                    >
                                        <div className="setting-square-box"></div>
                                        Small Box
                                    </label>
                                </Col>
                                <Col md="8">
                                    <input 
                                        type="radio" 
                                        value="long" 
                                        name="shape-input" 
                                        id="shape-long"
                                        onChange={changeShapeLong}
                                    />
                                    <label 
                                        htmlFor="shape-long" 
                                        className={shape === "long" ? "shape-selected" : ""}
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

export default GeneralSettings;