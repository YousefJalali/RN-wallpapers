import Icon from "react-native-vector-icons/Ionicons";
import { SAVE_ICONS } from "./actionTypes";

export const getIcons = () => {
  return dispatch => {
    Promise.all([
      Icon.getImageSource("md-more", 30, "#ededed"),
      Icon.getImageSource("md-heart-empty", 30, "#ededed"),
      Icon.getImageSource("md-heart", 30, "#f73859")
    ]).then(sources => dispatch(saveIcons(sources)));
  };
};

export const saveIcons = icons => {
  return {
    type: SAVE_ICONS,
    icons: icons
  };
};
