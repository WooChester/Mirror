import {React, useContext} from "react";
import Footer from './footer.js';
import Menu from './menu/menu.js';

import { GlobalStoreContext } from '../store/index.js';
import AppBox from './app_box.js';
import AppSettings from './app_settings.js';

const MainComponent = () => {

    const { store } = useContext(GlobalStoreContext);

    const open_apps = store.active_apps.map((app) => (
        <AppBox
            key={app.id}
            id={app.id}
            initX={app.x}
            initY={app.y}
        />
    ));

    let settings = store.hasOwnProperty("setting_mode") && store.setting_mode ? <AppSettings /> : "";

    return (
        <div id="container">
            {open_apps}
            {settings}
            <Menu />
            <Footer />
        </div>
    );
}

export default MainComponent;