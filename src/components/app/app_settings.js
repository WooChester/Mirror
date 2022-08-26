import {React, useContext, useState} from "react";
import { GlobalStoreContext } from '../../store/index.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AppSettings = () => {
    const { store } = useContext(GlobalStoreContext);

    const [menu, setMenu] = useState("general");
    const [boxShape, setBoxShape] = useState(store.current_app !== null ? store.current_app.settings.shape : "square");

    // Get current app's settings
    const changeAdvanced = function(){
        setMenu("advanced");
    }
    const changeGeneral = function(){
        setMenu("general");
    }

    const saveSettings = function(){
        if(store.current_app !== null){
            let updated_app = {
                id: store.current_app.id,
                x: store.current_app.x,
                y: store.current_app.y,
                settings: {
                    shape: boxShape
                }
            }
            store.save_app(updated_app);
        }
    }

    const changeShapeSquare = function(){
        setBoxShape("square");
    }

    const changeShapeLong = function(){
        setBoxShape("long");
    }

    let fields;
    if(menu === "general"){
        fields = <div id="general-settings">
                    <h1>General Settings</h1>
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
                                            for="shape-square" 
                                            className={boxShape === "square" ? "shape-selected" : ""}
                                        >
                                            <div id="setting-square-box"></div>
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
                                            for="shape-long" 
                                            className={boxShape === "long" ? "shape-selected" : ""}
                                        >
                                            <div id="setting-long-box"></div>
                                            Long Box
                                        </label>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>;
    }
    else if(menu === "advanced"){
        fields = <div>
                    <h1>Advanced Settings</h1>
                </div>;
    }
    else{
        fields = <div>
                    <h1>Unknown Menu</h1>
                    <p>menu</p>
                </div>;
    }

    return(
        <div className="full-width active">
            <Container id="app-settings">
                <Row id="app-setting-body">
                    <Col md={3} id="app-setting-nav">
                        <div onClick={ changeGeneral } >
                            <h2 className={ menu === "general" ? "highlight" : "" }>
                                General
                            </h2>
                        </div>
                        <div onClick={ changeAdvanced } >
                            <h2 className={ menu === "advanced" ? "highlight" : "" }>
                                Advanced
                            </h2>
                        </div>
                    </Col>
                    <Col md={9} id="app-setting-fields">
                        {fields}
                    </Col>
                </Row>
                <Row id="app-setting-footer">
                    <Col>
                        <input type="button" value="Close" onClick={saveSettings}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AppSettings;