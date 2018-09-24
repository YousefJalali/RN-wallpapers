import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import storeConfig from "./src/store/storeConfig";
import App from "./App";

const store = storeConfig();

const appRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent("backgroundsapp", () => appRedux);
