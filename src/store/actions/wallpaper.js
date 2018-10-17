import { SET_WALLPAPERS } from "./actionTypes";
import {
  fetchFavorite,
  modalBoxVisible,
  modalBoxInvisible,
  loadingStart,
  loadingEnd
} from "./index";
import RNFetchBlob from "rn-fetch-blob";
import { CameraRoll, Alert } from "react-native";

export const fetchWallpapers = () => {
  return dispatch => {
    fetch("https://skull-background.firebaseio.com/wallpapers.json")
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedRes => {
        const wallpapers = [];
        for (let wallpaper in parsedRes) {
          wallpapers.push({
            key: parsedRes[wallpaper].id,
            wallpaper: { uri: parsedRes[wallpaper].wallpaper },
            likes: parsedRes[wallpaper].likes
          });
        }
        dispatch(fetchFavorite(wallpapers));
        dispatch(setWallpapers(wallpapers));
      })
      .catch(err => {
        alert("No internet connection!");
      });
  };
};

export const setWallpapers = wallpapers => {
  return {
    type: SET_WALLPAPERS,
    wallpapers: wallpapers
  };
};

export const saveToCameraRoll = wallpaper => {
  return dispatch => {
    dispatch(loadingStart());
    RNFetchBlob.config({
      fileCache: true,
      appendExt: "jpg"
    })
      .fetch("GET", wallpaper.uri)
      .then(res => {
        CameraRoll.saveToCameraRoll(res.path())
          .then(() => {
            dispatch(loadingEnd());
            dispatch(modalBoxVisible());
            setTimeout(() => {
              dispatch(modalBoxInvisible());
            }, 1500);
          })
          .catch(err => alert(err));
      });
  };
};
