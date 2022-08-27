import {React, useContext} from "react";
import { GlobalStoreContext } from '../../store/index.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCloud, faMusic, faCalendar, faGear, faDesktop } from '@fortawesome/free-solid-svg-icons';

const MenuItem = ( { appType, id } ) => {

    const { store } = useContext(GlobalStoreContext);

    let classList = "";
    let active = false;
    for(let i = 0; i < store.active_apps.length; i++){
        if(store.active_apps[i].id === id){
            classList = " active";
            active = true;
        }
    }
    const selectApp = function(e){
        if(id == 3){
            store.toggle_setting();
        }
        else if(!active){
            let new_app = {
                id: id,
                x: (e.clientX - 50),
                y: (e.clientY - 50),
                settings: {
                    shape: store.settings.default_shape
                }
            };
            store.init_app(new_app);
        }
    }


    let appIcon;
    switch(appType){
        case "weather":
            appIcon = faCloud;
            break;
        case "music":
            appIcon = faMusic;
            break;
        case "calendar":
            appIcon = faCalendar;
            break;
        case "setting":
            appIcon = faGear;
            break;
        case "screen":
            appIcon = faDesktop;
            break;
        default:
            appIcon = "";
    }

    const styling = {"--i": id};

    return(
        <li style={styling} onMouseDown={selectApp} className={classList}>
            <div className="menu_icon"><FontAwesomeIcon icon={ appIcon } size="2x"/></div>
        </li>
    )
}

export default MenuItem;