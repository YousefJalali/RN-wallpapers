import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import wallpaperReducer from "./reducers/wallpaper";
import iconsReducer from "./reducers/icons";
import uiReducer from "./reducers/ui";

const rootReducer = combineReducers({
  wallpaper: wallpaperReducer,
  icons: iconsReducer,
  ui: uiReducer
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const storeConfig = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default storeConfig;
