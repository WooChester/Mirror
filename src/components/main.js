import {React, useContext} from "react";
import Footer from './footer.js';
import Menu from './menu/menu.js';

import { GlobalStoreContext } from '../store/index.js';
import AppBox from './app/app_box.js';
import AppSettings from './app/app_settings.js';

const MainComponent = () => {

    const { store } = useContext(GlobalStoreContext);
    console.log(store);
    const active_apps = store.active_apps.map((app) => (
        <AppBox
            key={app.id}
            app={app}
        />
    ));

    let settings = store.hasOwnProperty("setting_mode") && store.setting_mode ? <AppSettings /> : "";

    return (
        <div id="container">
            {active_apps}
            {settings}
            <Menu />
            <Footer />
        </div>
    );
}

export default MainComponent;