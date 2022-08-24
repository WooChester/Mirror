import {React, useContext} from "react";
import { GlobalStoreContext } from '../../store/index.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCloud, faMusic, faCalendar, faGear, faDesktop } from '@fortawesome/free-solid-svg-icons';

const MenuItem = ( { appType, count } ) => {

    const { store } = useContext(GlobalStoreContext);

    let classList = "";
    let active = false;
    for(let i = 0; i < store.active_apps.length; i++){
        if(store.active_apps[i].id === count){
            classList = " active";
            active = true;
        }
    }
    const createApp = function(e){
        if(!active){
            let new_app = {
                id: count,
                x: (e.clientX),
                y: (e.clientY)
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

    const styling = {"--i": count};

    return(
        <li style={styling} onMouseDown={createApp} className={classList}>
            <div className="menu_icon"><FontAwesomeIcon icon={ appIcon } size="2x"/></div>
        </li>
    )
}

export default MenuItem;