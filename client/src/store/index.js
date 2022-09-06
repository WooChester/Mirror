import { createContext, useState } from 'react'
import api from '../api'


// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    TOGGLE_MENU: "TOGGLE_MENU",
    TOGGLE_EDIT: "TOGGLE_EDIT",
    TOGGLE_LIGHT: "TOGGLE_LIGHT",
    TOGGLE_SETTING: "TOGGLE_SETTING",
    TOGGLE_LOCK: "TOGGLE_LOCK",

    INIT_APP: "INIT_APP",
    INIT_WEATHER: "INIT_WEATHER",

    ADD_APP: "ADD_APP",
    REMOVE_APP: "REMOVE_APP",
    HOLD_APP: "HOLD_APP",
    RELEASE_APP: "RELEASE_APP",

    EDIT_APP: "EDIT_APP",
    SAVE_APP: "SAVE_APP",
    SAVE_SETTINGS: "SAVE_SETTINGS"
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
        current_app: null,
        settings: {
            default_shape: "square"
        },
        mode: {
            edit_mode: false,
            light_mode: false,
            lock_mode: false
        },
        app_data: {
            weather: {},
            calendar: {},
            spotify: {}
        }
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
                    current_app: null,
                    settings: store.settings,
                    mode: store.mode,
                    app_data: store.app_data
                });
            }
            case GlobalStoreActionType.TOGGLE_EDIT: {
                return setStore({
                    active_apps: store.active_apps,
                    menu_open: store.menu_open,
                    current_app: null,
                    settings: store.settings,
                    mode: {
                        edit_mode: !store.mode.edit_mode,
                        light_mode: store.mode.light_mode,
                        lock_mode: false
                    },
                    app_data: store.app_data
                });
            }
            case GlobalStoreActionType.TOGGLE_LIGHT: {
                return setStore({
                    active_apps: store.active_apps,
                    menu_open: store.menu_open,
                    current_app: null,
                    settings: store.settings,
                    mode: {
                        edit_mode: store.mode.edit_mode,
                        light_mode: !store.mode.light_mode,
                        lock_mode: false
                    },
                    app_data: store.app_data
                });
            }
            case GlobalStoreActionType.TOGGLE_SETTING: {
                return setStore({
                    active_apps: store.active_apps,
                    menu_open: false,
                    current_app: null,
                    settings: store.settings,
                    mode: {
                        edit_mode: false,
                        light_mode: store.mode.light_mode,
                        lock_mode: false,
                        setting_mode: true
                    },
                    app_data: store.app_data
                })
            }
            case GlobalStoreActionType.TOGGLE_LOCK: {
                return setStore({
                    active_apps: store.active_apps,
                    menu_open: false,
                    current_app: null,
                    settings: store.settings,
                    mode: {
                        edit_mode: false,
                        light_mode: store.mode.light_mode,
                        lock_mode: !store.mode.lock_mode,
                    },
                    app_data: store.app_data
                })
            }

            case GlobalStoreActionType.INIT_APP: {
                return setStore({
                    active_apps: payload.active_apps,
                    menu_open: false,
                    current_app: payload.current_app,
                    new_app: payload.current_app,
                    settings: store.settings,
                    mode: store.mode,
                    app_data: store.app_data
                });
            }

            case GlobalStoreActionType.INIT_WEATHER: {
                return setStore({
                    active_apps: payload.active_apps,
                    menu_open: false,
                    current_app: null,
                    settings: store.settings,
                    mode: store.mode,
                    app_data: {
                        weather: payload.weather_data,
                        calendar: store.app_data.calendar,
                        spotify: store.app_data.spotify
                    }
                });
            }

            case GlobalStoreActionType.ADD_APP: {
                return setStore({
                    active_apps: payload.active_apps,
                    menu_open: false,
                    current_app: null,
                    settings: store.settings,
                    mode: store.mode,
                    app_data: store.app_data
                })
            }
            case GlobalStoreActionType.RELEASE_APP: {
                return setStore({
                    active_apps: payload.active_apps,
                    menu_open: false,
                    current_app: null,
                    settings: store.settings,
                    mode: store.mode,
                    app_data: store.app_data
                });
            }
            case GlobalStoreActionType.REMOVE_APP: {
                return setStore({
                    active_apps: payload.active_apps,
                    menu_open: false,
                    current_app: null,
                    settings: store.settings,
                    mode: {
                        edit_mode: false,
                        light_mode: store.mode.light_mode,
                        lock_mode: false
                    },
                    app_data: store.app_data
                });
            }
            case GlobalStoreActionType.HOLD_APP: {
                return setStore({
                    active_apps: store.active_apps,
                    menu_open: false,
                    current_app: payload.current_app,
                    settings: store.settings,
                    mode: store.mode,
                    app_data: store.app_data
                });
            }

            case GlobalStoreActionType.EDIT_APP: {
                return setStore({
                    active_apps: store.active_apps,
                    menu_open: false,
                    current_app: payload.current_app,
                    settings: store.settings,
                    mode: {
                        edit_mode: store.mode.edit_mode,
                        light_mode: store.mode.light_mode,
                        lock_mode: store.mode.lock_mode,
                        setting_mode: true
                    },
                    app_data: store.app_data
                });
            }
            case GlobalStoreActionType.SAVE_APP: {
                return setStore({
                    active_apps: payload.active_apps,
                    menu_open: false,
                    current_app: null,
                    settings: store.settings,
                    mode: {
                        edit_mode: store.mode.edit_mode,
                        light_mode: store.mode.light_mode,
                        lock_mode: store.mode.lock_mode
                    },
                    app_data: store.app_data
                })
            }
            case GlobalStoreActionType.SAVE_SETTINGS: {
                return setStore({
                    active_apps: store.active_apps,
                    menu_open: false,
                    current_app: null,
                    settings: payload.settings,
                    mode: {
                        edit_mode: store.mode.edit_mode,
                        light_mode: store.mode.light_mode,
                        lock_mode: false
                    },
                    app_data: store.app_data
                })
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // FUNCTION TO TOGGLE MENU
    store.toggle_menu = function(){
        storeReducer({
            type: GlobalStoreActionType.TOGGLE_MENU,
            payload: {}
        });
    }
    // FUNCTION TO TOGGLE DRAG
    store.toggle_edit = function(){
        storeReducer({
            type: GlobalStoreActionType.TOGGLE_EDIT,
            payload: {}
        });
    }
    // FUNCTION TO TOGGLE LIGHT
    store.toggle_light = function(){
        storeReducer({
            type: GlobalStoreActionType.TOGGLE_LIGHT,
            payload: {}
        });
    }
    // FUNCTION TO TOGGLE SYSTEM SETTINGS
    store.toggle_setting = function(){
        storeReducer({
            type: GlobalStoreActionType.TOGGLE_SETTING,
            payload: {}
        })
    }

    store.toggle_lock = function(){
        storeReducer({
            type: GlobalStoreActionType.TOGGLE_LOCK,
            payload: {}
        })
    }

    // FUNCTION TO INTIALIZE AN APP ON THE PAGE (ON MOUSE DOWN)
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

    store.init_weather = async function () {
        const response = await api.getWeather({"location": "Long Beach"});
        if (response.data.cod == 200) {
            console.log(response.data);
        }
        else {
            console.log("API FAILED TO GET THE WEATHER!");
            console.log("Error " + response.data.cod + ": " + response.data.message);
        }
        return response.data;
    }


    // FUNCTION TO FINALIZE THE APP'S ADDITION TO THE PAGE (ON MOUSE OUT)
    store.add_app = async function(app){
        let updated_apps = [...store.active_apps];
        for(let i = 0; i < store.active_apps.length; i++){
            if(store.active_apps[i].id === app.id){
                updated_apps[i] = app;
                break;
            }
        }
        if(app.id == 0){
            let weather_data = await store.init_weather();
            storeReducer({
                type: GlobalStoreActionType.INIT_WEATHER,
                payload: {
                    active_apps: updated_apps,
                    weather_data: weather_data
                }
            })
        }
        else{
            storeReducer({
                type: GlobalStoreActionType.ADD_APP,
                payload: {
                    active_apps: updated_apps
                }
            })
        }
    }
    
    // FUNCTION FOR SAVING THE NEW X,Y LOCATION OF APP AFTER DRAG
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
    // FUNCTION TO REMOVE APP FROM PAGE
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
    // FUNCTION TO BEGIN DRAG ON A CURRENT APP
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

    // FUNCTION TO EDIT THE APP SETTINGS
    store.edit_app = function(app){
        storeReducer({
            type: GlobalStoreActionType.EDIT_APP,
            payload: {current_app: app}
        });
    }
    // FUNCTION TO SAVE APP SETTINGS
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
    // FUNCTION TO SAVE SYSTEM SETTINGS
    store.save_settings = function(settings){
        storeReducer({
            type: GlobalStoreActionType.SAVE_SETTINGS,
            payload: {settings: settings}
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