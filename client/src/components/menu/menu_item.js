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

            let e_x, e_y;
            if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
                var touch = e.nativeEvent.touches[0] || e.nativeEvent.changedTouches[0];
                e_x = touch.pageX;
                e_y = touch.pageY;
            } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
                e_x = e.clientX;
                e_y = e.clientY;
            }

            let new_app = {
                id: id,
                x: (e_x - 50),
                y: (e_y - 50),
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
        <li style={styling} onMouseDown={selectApp} onTouchStart={selectApp} className={classList}>
            <div className="menu_icon"><FontAwesomeIcon icon={ appIcon } size="2x"/></div>
        </li>
    )
}

export default MenuItem;