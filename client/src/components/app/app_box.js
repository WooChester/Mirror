import {React, useContext, useState} from "react";
import { GlobalStoreContext } from '../../store/index.js';

import ModeBar from './mode_bar.js';
import Weather from './weather.js';
import Calendar from './calendar.js';
import Music from './music.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const AppBox = ({app}) => {

    const { store } = useContext(GlobalStoreContext);
    
    const is_active = (store.current_app !== null && store.current_app.id === app.id);
    let is_new = store.hasOwnProperty("new_app");

    const [dragging, setDragging] = useState(is_active);

    const [x, setX] = useState(is_new ? app.x + 50 : 0);
    const [y, setY] = useState(is_new ? app.y + 50 : 0);
    const [style, setStyle] = useState({top: app.y + "px", left: app.x + "px"});

    const handleDown = (e) => {

        let e_x, e_y;

        if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
            var touch = e.nativeEvent.touches[0] || e.nativeEvent.changedTouches[0];
            e_x = touch.pageX;
            e_y = touch.pageY;
        } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
            e_x = e.clientX;
            e_y = e.clientY;
        }
        
        if(!store.mode.lock_mode || app.id == 2){
            setDragging(true);
            setX(e_x);
            setY(e_y);
            setStyle({top: app.y + "px", left: app.x + "px", transition: "0s"});

            store.hold_app(app);
        }
        
    }

    const handleMove = (e) => {

        let e_x, e_y;
        if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
            var touch = e.nativeEvent.touches[0] || e.nativeEvent.changedTouches[0];
            e_x = touch.pageX;
            e_y = touch.pageY;
        } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
            e_x = e.clientX;
            e_y = e.clientY;
        }

        if(dragging){

            let diffX = e_x - x;
            let diffY = e_y - y;

            setStyle({top: app.y + diffY + "px", left: app.x + diffX + "px", transition: "0s"});
        }
    }

    const handleUp = (e) => {

        let e_x, e_y;
        if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
            var touch = e.nativeEvent.touches[0] || e.nativeEvent.changedTouches[0];
            e_x = touch.pageX;
            e_y = touch.pageY;
        } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
            e_x = e.clientX;
            e_y = e.clientY;
        }

        if(dragging){
            let diffX = e_x - x;
            let diffY = e_y - y;

            let updated_app = {
                id: app.id,
                x: app.x + diffX,
                y: app.y + diffY,
                settings: app.settings
            }

            let trash = document.getElementById("footer").firstChild;
            var trash_rect = trash.getBoundingClientRect();
            
            if(e_x <= trash_rect.right && e_x >= trash_rect.left && e_y <= trash_rect.bottom && e_y >= trash_rect.top){
                store.remove_app(updated_app);
            }
            else{
                if(is_new){
                    store.add_app(updated_app);
                }
                else{
                    store.release_app(updated_app);
                }
            }
            setDragging(false);
            setStyle({top: updated_app.y + "px", left: updated_app.x + "px", transition: ".5s"})
        }
    }

    const openSettings = () => {
        store.edit_app(app);
    }

    let box_class = "app-box no-select";
    if(is_new && store.new_app.id === app.id) box_class += " initial";
    if(app.settings.shape !== "square") box_class += " shape-" + app.settings.shape;
    box_class += dragging ? " active" : "";
    let box_text = <p>{app.id}</p>;

    if(app.id == 2){
        box_class = "mode-bar no-select";
        if(store.mode.lock_mode) box_class += " lock-bar";
        box_text = <ModeBar />
    }
    if(app.id == 0){
        box_text = <Weather />
    }
    else if(app.id == 1){
        box_text = <Music />
    }
    else if(app.id == 4){
        box_text = <Calendar app={app} />
    }


    return(
        <div 
            className={box_class} 
            style={style} 
            onMouseDown={handleDown} 
            onMouseMove={handleMove} 
            onMouseUp={handleUp}
            //onDragStart={handleDown}
            //onDrag={handleMove}
            //onDragEnd={handleUp}
            onTouchStart={handleDown}
            onTouchMove={handleMove}
            onTouchEnd={handleUp}
        >
            <div className="app-settings" onClick={openSettings}><FontAwesomeIcon icon={ faEllipsisV } size="2x"/></div>
            {box_text}
        </div>
    )
}

export default AppBox;