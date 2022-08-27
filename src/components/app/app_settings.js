import {React, useContext, useState} from "react";
import { GlobalStoreContext } from '../../store/index.js';
import GeneralSettings from './general_settings.js';
import SystemSettings from './system_settings.js';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AppSettings = () => {
    const { store } = useContext(GlobalStoreContext);

    const [menu, setMenu] = useState("general");
    
    // Get current app's settings
    const changeAdvanced = function(){
        setMenu("advanced");
    }
    const changeGeneral = function(){
        setMenu("general");
    }

    let fields;
    if(menu === "general"){
        if(store.current_app !== null){
            fields = <GeneralSettings />;
        }
        else{
            fields = <SystemSettings />;
        }
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
                <Row id="app-setting-box">
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
            </Container>
        </div>
    );
}

export default AppSettings;