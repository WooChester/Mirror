import {React, useContext} from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import MenuItem from './menu_item.js';
import { GlobalStoreContext } from '../../store/index.js';

const Menu = () => {

    const { store } = useContext(GlobalStoreContext);

    const handleClose = function(){
        store.toggle_menu();
    }

    let classList = "";
    let closeStyling = {display: "none"};
    let menuStyling = {};
    if(store.menu_open){
        classList = "active";
        closeStyling = {display: "block"}
        menuStyling.zIndex = "11";
    }

    return(
        <div id="menu" className={classList} style={menuStyling}>
            <div id="close" style={closeStyling}><FontAwesomeIcon icon={ faTimes } size="3x" onClick={handleClose} /></div>
            <MenuItem 
                appType="weather"  
                count="0" 
            />
            <MenuItem 
                appType="music"  
                count="1" 
            />
            <MenuItem 
                appType="screen"  
                count="2" 
            />
            <MenuItem 
                appType="setting"  
                count="3" 
            />
            <MenuItem 
                appType="calendar"  
                count="4" 
            />
        </div>
    )
};

export default Menu;