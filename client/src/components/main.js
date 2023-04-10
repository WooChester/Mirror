import {React, useContext, useState} from "react";
import Footer from './footer.js';
import Menu from './menu/menu.js';

import { GlobalStoreContext } from '../store/index.js';
import AppBox from './app/app_box.js';
import AppSettings from './app/app_settings.js';

const MainComponent = () => {

    const { store } = useContext(GlobalStoreContext);
    console.log(store);

    const handleUp = () => {
        if(store.new_app){
            console.log("UP!");
            store.add_app(store.new_app);
        }
    }

    const active_apps = store.active_apps.map((app) => (
        <AppBox
            key={app.id}
            app={app}
        />
    ));

    let settings = store.mode.hasOwnProperty("setting_mode") && store.mode.setting_mode ? <AppSettings /> : "";
    let light = store.mode.light_mode ? <div id="light"></div> : "";

    return (
        <div id="container" onTouchEnd={handleUp} onMouseUp={handleUp}>
            <Menu />
            {active_apps}
            {settings}
            {light}
            <Footer />
        </div>
    );
}

export default MainComponent;