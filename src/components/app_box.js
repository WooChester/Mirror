import {React, useContext, useState} from "react";
import { GlobalStoreContext } from '../store/index.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const AppBox = ({id, initX, initY}) => {

    const { store } = useContext(GlobalStoreContext);
    
    const is_active = store.current_app !== null && store.current_app.id === id;
    let is_new = store.hasOwnProperty("new_app");

    const [dragging, setDragging] = useState(is_active);

    const [x, setX] = useState(is_new ? initX + 50 : 0);
    const [y, setY] = useState(is_new ? initY + 50 : 0);
    const [style, setStyle] = useState({top: initY + "px", left: initX + "px"});

    const handleDown = (e) => {

        let app = {
            id: id,
            x: initX,
            y: initY
        }
        
        setDragging(true);
        setX(e.clientX);
        setY(e.clientY);
        setStyle({top: initY + "px", left: initX + "px", transition: "0s"});

        store.hold_app(app);
        
    }

    const handleMove = (e) => {
        if(dragging){

            let diffX = e.clientX - x;
            let diffY = e.clientY - y;

            setStyle({top: initY + diffY + "px", left: initX + diffX + "px", transition: "0s"});
        }
    }

    const handleUp = (e) => {
        let diffX = e.clientX - x;
        let diffY = e.clientY - y;

        let app = {
            id: id,
            x: initX + diffX,
            y: initY + diffY
        }

        let trash = document.getElementById("footer").firstChild;
        var trash_rect = trash.getBoundingClientRect();
        
        if(e.clientX <= trash_rect.right && e.clientX >= trash_rect.left && e.clientY <= trash_rect.bottom && e.clientY >= trash_rect.top){
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
        setStyle({top: app.y + "px", left: app.x + "px", transition: ".5s"})
    }

    const openSettings = () => {
        alert();
    }

    let box_class = "app-box no-select";
    if(is_new && store.new_app.id === id) box_class += " initial";
    box_class += dragging ? " active" : "";
    let box_text = id;

    return(
        <div 
            className={box_class} 
            style={style} 
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