import { createContext, useState } from 'react'


// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    TOGGLE_MENU: "TOGGLE_MENU",
    TOGGLE_EDIT: "TOGGLE_EDIT",
    TOGGLE_LIGHT: "TOGGLE_LIGHT",

    INIT_APP: "INIT_APP",
    ADD_APP: "ADD_APP",
    REMOVE_APP: "REMOVE_APP",
    HOLD_APP: "HOLD_APP",
    RELEASE_APP: "RELEASE_APP",

    EDIT_APP: "EDIT_APP",
    SAVE_APP: "SAVE_APP"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        active_apps: [],
        menu_open: false,
        edit_mode: false,
        light_mode: false,
        setting_mode: false,
        current_app: null
    });

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {

        const { type, payload } = action;
        console.log(type);
        switch (type) {
            case GlobalStoreActionType.TOGGLE_MENU: {
                return setStore({
                    active_apps: store.active_apps,
                    menu_open: !store.menu_open,
                    edit_mode: false,
                    light_mode: store.light_mode,
                    current_app: null
                });
            }
            case GlobalStoreActionType.TOGGLE_EDIT: {
                return setStore({
                    active_apps: store.active_apps,
                    menu_open: store.menu_open,
                    edit_mode: !store.edit_mode,
                    light_mode: store.light_mode,
                    current_app: null
                });
            }
            case GlobalStoreActionType.TOGGLE_LIGHT: {
                return setStore({
                    active_apps: store.active_apps,
                    menu_open: store.menu_open,
                    edit_mode: store.edit_mode,
                    light_mode: !store.light_mode,
                    current_app: null
                });
            }
            case GlobalStoreActionType.INIT_APP: {
                return setStore({
                    active_apps: payload.active_apps,
                    menu_open: false,
                    edit_mode: true,
                    light_mode: store.light_mode,
                    current_app: payload.current_app,
                    new_app: payload.current_app
                });
            }
            case GlobalStoreActionType.ADD_APP: {
                return setStore({
                    active_apps: payload.active_apps,
                    menu_open: false,
                    edit_mode: false,
                    light_mode: store.light_mode,
                    current_app: null,
                })
            }
            case GlobalStoreActionType.RELEASE_APP: {
                return setStore({
                    active_apps: payload.active_apps,
                    menu_open: false,
                    edit_mode: false,
                    light_mode: store.light_mode,
                    current_app: null
                });
            }
            case GlobalStoreActionType.REMOVE_APP: {
                return setStore({
                    active_apps: payload.active_apps,
                    menu_open: false,
                    edit_mode: true,
                    light_mode: store.light_mode,
                    current_app: null
                });
            }
            case GlobalStoreActionType.HOLD_APP: {
                return setStore({
                    active_apps: store.active_apps,
                    menu_open: false,
                    edit_mode: true,
                    light_mode: store.light_mode,
                    current_app: payload.current_app
                });
            }

            case GlobalStoreActionType.EDIT_APP: {
                return setStore({
                    active_apps: store.active_apps,
                    menu_open: false,
                    edit_mode: store.edit_mode,
                    light_mode: store.light_mode,
                    setting_mode: true,
                    current_app: payload.current_app
                });
            }
            case GlobalStoreActionType.SAVE_APP: {
                return setStore({
                    active_apps: payload.active_apps,
                    menu_open: false,
                    edit_mode: store.edit_mode,
                    light_mode: store.light_mode,
                    current_app: null
                })
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.
    store.toggle_menu = function(){
        storeReducer({
            type: GlobalStoreActionType.TOGGLE_MENU,
            payload: {}
        });
    }
    // FUNCTION TO TOGGLE MENU
    store.toggle_edit = function(){
        storeReducer({
            type: GlobalStoreActionType.TOGGLE_EDIT,
            payload: {}
        });
    }
    // FUNCTION TO TOGGLE MENU
    store.toggle_light = function(){
        storeReducer({
            type: GlobalStoreActionType.TOGGLE_LIGHT,
            payload: {}
        });
    }

    store.init_app = function(app){
        let updated_apps = store.active_apps.concat(app);

        storeReducer({
            type: GlobalStoreActionType.INIT_APP,
            payload: {
                        active_apps: updated_apps,
                        current_app: app
                    }
        });
    }

    store.add_app = function(app){
        let updated_apps = [...store.active_apps];
        for(let i = 0; i < store.active_apps.length; i++){
            if(store.active_apps[i].id === app.id){
                updated_apps[i] = app;
                break;
            }
        }
        storeReducer({
            type: GlobalStoreActionType.ADD_APP,
            payload: {
                active_apps: updated_apps
            }
        })
    }

    store.release_app = function(app){
        let updated_apps = [...store.active_apps];
        for(let i = 0; i < store.active_apps.length; i++){
            if(store.active_apps[i].id === app.id){
                updated_apps[i] = app;
                break;
            }
        }
        storeReducer({
            type: GlobalStoreActionType.RELEASE_APP,
            payload: {
                        active_apps: updated_apps
            }
        });
    }

    store.remove_app = function(app){
        let updated_apps = [...store.active_apps];
        for(let i = 0; i < updated_apps.length; i++){
            if(updated_apps[i].id === app.id){
                updated_apps.splice(i, 1);
                break;
            }
        }
        storeReducer({
            type: GlobalStoreActionType.REMOVE_APP,
            payload: {
                        active_apps: updated_apps,
                        current_app: app
            }
        });
    }

    store.hold_app = function(app){
        let updated_apps = [...store.active_apps];
        for(let i = 0; i < store.active_apps.length; i++){
            if(store.active_apps[i].id === app.id){
                updated_apps[i] = app;
                break;
            }
        }
        storeReducer({
            type: GlobalStoreActionType.HOLD_APP,
            payload: {
                        active_apps: updated_apps,
                        current_app: app
                    }
        });
    }

    store.edit_app = function(app){
        storeReducer({
            type: GlobalStoreActionType.EDIT_APP,
            payload: {current_app: app}
        });
    }
    store.save_app = function(app){
        let updated_apps = [...store.active_apps];
        for(let i = 0; i < store.active_apps.length; i++){
            if(store.active_apps[i].id === app.id){
                updated_apps[i] = app;
                break;
            }
        }
        storeReducer({
            type: GlobalStoreActionType.SAVE_APP,
            payload: {active_apps: updated_apps}
        })
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };