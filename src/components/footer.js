import {React, useContext} from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { GlobalStoreContext } from '../store/index.js'

const Footer = () => {
    
    const { store } = useContext(GlobalStoreContext);

    const handleClick = function(){
        store.toggle_menu();
    }

    let icon = <FontAwesomeIcon icon={faCirclePlus} onClick={handleClick} size="4x"></FontAwesomeIcon>;
    let footerClass = "";
    if(store.current_app != null){
        icon = <FontAwesomeIcon icon={faTrash} onClick={handleClick} size="4x"></FontAwesomeIcon>;
        footerClass = "footer-trash";
    }
    else if(store.menu_open){
        icon = "";
    }

    return(
        <div id="footer" className={footerClass}>
            {icon}
        </div>
    )
}

export default Footer;