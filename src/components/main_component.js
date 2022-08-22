import {React, useContext} from "react";
import Footer from './footer.js';
import Menu from './menu/menu.js';

import { GlobalStoreContext } from '../store/index.js';
import AppBox from './app_box.js';

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

    return (
        <div id="container">
            {open_apps}
            <Menu />
            <Footer />
        </div>
    );
}

export default MainComponent;