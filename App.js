import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";

import storeConfig from "./src/store/storeConfig";

import Wallpapers from "./src/screens/Wallpapers";
import SideDrawer from "./src/screens/SideDrawer";
import Wallpaper from "./src/screens/Wallpaper";
import Favorite from "./src/screens/Favorite";
import About from "./src/screens/About";

const store = storeConfig();

//register screens
Navigation.registerComponent(
  "skull.Wallpapers",
  () => Wallpapers,
  store,
  Provider
);
Navigation.registerComponent("skull.SideDrawer", () => SideDrawer);
Navigation.registerComponent(
  "skull.Wallpaper",
  () => Wallpaper,
  store,
  Provider
);
Navigation.registerComponent("skull.Favorite", () => Favorite, store, Provider);
Navigation.registerComponent("skull.About", () => About);

export default () =>
  Icon.getImageSource("md-menu", 30, "#ededed").then(source => {
    Navigation.startSingleScreenApp({
      screen: {
        screen: "skull.Wallpapers",
        // title: "WALLPAPERS",
        navigatorStyle: {
          navBarTransparent: true,
          drawUnderNavBar: true,
          statusBarHidden: true,
          navBarComponentAlignment: "center"
          // drawUnderStatusBar: false
        },
        navigatorButtons: {
          leftButtons: [
            {
              icon: source,
              title: "menu",
              id: "sideDrawerToggle"
            }
          ]
        }
      },
      drawer: {
        left: {
          screen: "skull.SideDrawer"
        }
      }
    });
  });
