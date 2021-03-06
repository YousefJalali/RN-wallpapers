import { AsyncStorage } from "react-native";
import { ADD_FAVORITE, REMOVE_FAVORITE, LOAD_FAVORITES } from "./actionTypes";

export const fetchFavorite = wallpapers => {
  return dispatch => {
    AsyncStorage.getItem("skull:favorite")
      .then(res => {
        const parsedRes = JSON.parse(res);
        if (typeof parsedRes == "string") {
          const favWallpapers = [];
          favWallpapers.push(
            wallpapers.find(
              wallpaper => wallpaper.key === parsedRes.slice(1, -1)
            )
          );
          dispatch(setFavorite(favWallpapers));
        } else {
          const favWallpapers = [];
          for (let key in parsedRes) {
            const fv = wallpapers.find(wallpaper => {
              return wallpaper.key === parsedRes[key];
            });
            favWallpapers.push({
              key: fv.key,
              wallpaper: fv.wallpaper,
              likes: fv.likes
            });
          }
          dispatch(setFavorite(favWallpapers));
        }
      })
      .catch(err => {
        alert("Start adding");
      });
  };
};

export const setFavorite = favWallpapers => {
  return {
    type: LOAD_FAVORITES,
    favWallpapers: favWallpapers
  };
};

export const addFavoriteStorage = wallpaperKey => {
  return dispatch => {
    AsyncStorage.getItem("skull:favorite")
      .then(res => {
        const parsedRes = JSON.parse(res);
        if (Array.isArray(parsedRes)) {
          if (wallpaperKey === parsedRes.find(key => key === wallpaperKey)) {
            dispatch(removeFavorite(wallpaperKey));
            const filterFav = parsedRes.filter(key => key !== wallpaperKey);
            return AsyncStorage.setItem(
              "skull:favorite",
              JSON.stringify(filterFav)
            );
          } else {
            dispatch(addFavorite(wallpaperKey));
            parsedRes.push(wallpaperKey);
            return AsyncStorage.setItem(
              "skull:favorite",
              JSON.stringify(parsedRes)
            );
          }
        } else {
          const arr = [];
          arr.push(wallpaperKey);
          return AsyncStorage.setItem("skull:favorite", JSON.stringify(arr));
        }
      })
      .catch(() => {
        return AsyncStorage.setItem("skull:favorite", wallpaperKey);
      });
  };
};

export const addFavorite = addedFavoriteKey => {
  return {
    type: ADD_FAVORITE,
    addedFavoriteKey: addedFavoriteKey
  };
};

export const removeFavorite = removedFavoriteKey => {
  return {
    type: REMOVE_FAVORITE,
    removedFavoriteKey: removedFavoriteKey
  };
};
