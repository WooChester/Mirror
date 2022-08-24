import {React, useContext, useState} from "react";
import { GlobalStoreContext } from '../store/index.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const AppBox = ({id, initX, initY}) => {

    const { store } = useContext(GlobalStoreContext);
    
    const is_active = store.current_app !== null && store.current_app.id === id;
    let is_new = store.hasOwnProperty("new_app");

    const [dragging, setDragging] = useState(is_active);

    const [x, setX] = useState(initX);
    const [y, setY] = useState(initY);

    const handleDown = (e) => {

        let app = {
            id: id,
            x: e.clientX,
            y: e.clientY
        }
        
        store.hold_app(app);
        
        setDragging(true);
        setX(e.clientX);
        setY(e.clientY);
    }

    const handleMove = (e) => {
        if(dragging){
            setX(e.clientX);
            setY(e.clientY);
        }
    }

    const handleUp = (e) => {
        let drop_x = e.clientX;
        let drop_y = e.clientY;

        let app = {
            id: id,
            x: e.clientX,
            y: e.clientY
        }

        let trash = document.getElementById("footer").firstChild;
        var trash_rect = trash.getBoundingClientRect();
        
        if(drop_x <= trash_rect.right && drop_x >= trash_rect.left && drop_y <= trash_rect.bottom && drop_y >= trash_rect.top){
            store.remove_app(app);
        }
        else{
            if(is_new){
                store.add_app(app);
            }
            else{
                store.release_app(app);
            }
        }
        setDragging(false);
    }

    const openSettings = () => {
        alert();
    }

    let styling = {top: (y - 50) + "px", left: (x - 50) + "px"};
    if(dragging){
        styling.transition = "0s";
    }
    else{
        styling.transition = ".5s";
    }
    let box_class = "app-box";
    if(is_new && store.new_app.id === id) box_class += " initial";
    let box_text = id;

    return(
        <div 
            className={box_class} 
            style={styling} 
            onMouseDown={handleDown} 
            onMouseMove={handleMove} 
            onMouseUp={handleUp}
        >
            <div className="app-settings" onClick={openSettings}><FontAwesomeIcon icon={ faEllipsisV } size="2x"/></div>
            <p>{box_text}</p>
        </div>
    )
}

export default AppBox;