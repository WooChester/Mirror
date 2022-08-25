import {React, useContext, useState} from "react";
import { GlobalStoreContext } from '../store/index.js';

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

    const closeSettings = function(){

        store.save_app(store.current_app);
    }

    let fields;
    if(menu === "general"){
        fields = <div>
                    <h1>General Settings</h1>
                    <div className="col-4">
                        <label>Box Shape</label>
                    </div>
                    <div className="col-8">
                        <input type="radio" value="square" name="size-input"/>
                        <input type="radio" value="long" name="size-input"/>
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
            <div id="app-settings">
                <div className="row">
                    <div className="col-3" id="app-setting-nav">
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
                    </div>
                    <div className="col-9" id="app-setting-fields">
                        {fields}
                    </div>
                </div>
                <input type="button" value="Close" onClick={closeSettings}/>
            </div>
        </div>
    );
}

export default AppSettings;