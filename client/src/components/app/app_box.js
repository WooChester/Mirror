import {React, useContext, useState} from "react";
import { GlobalStoreContext } from '../../store/index.js';
import ModeBar from './mode_bar.js';
import Weather from './weather.js';

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
        
        if(!store.mode.lock_mode || app.id == 2){
            setDragging(true);
            setX(e.clientX);
            setY(e.clientY);
            setStyle({top: app.y + "px", left: app.x + "px", transition: "0s"});

            store.hold_app(app);
        }
        
    }

    const handleMove = (e) => {
        if(dragging){

            let diffX = e.clientX - x;
            let diffY = e.clientY - y;

            setStyle({top: app.y + diffY + "px", left: app.x + diffX + "px", transition: "0s"});
        }
    }

    const handleUp = (e) => {

        if(dragging){
            let diffX = e.clientX - x;
            let diffY = e.clientY - y;

            let updated_app = {
                id: app.id,
                x: app.x + diffX,
                y: app.y + diffY,
                settings: app.settings
            }

            let trash = document.getElementById("footer").firstChild;
            var trash_rect = trash.getBoundingClientRect();
            
            if(e.clientX <= trash_rect.right && e.clientX >= trash_rect.left && e.clientY <= trash_rect.bottom && e.clientY >= trash_rect.top){
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

    return(
        <div 
            className={box_class} 
            style={style} 
            onMouseDown={handleDown} 
            onMouseMove={handleMove} 
            onMouseUp={handleUp}
            onDragStart={handleDown}
            onDrag={handleMove}
            onDragEnd={handleUp}
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