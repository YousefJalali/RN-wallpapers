import {
  SET_WALLPAPERS,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  LOAD_FAVORITES
} from "../actions/actionTypes";

const initialState = {
  wallpapers: [],
  favorites: []
};

const wallpapers = (state = initialState, action) => {
  switch (action.type) {
    case SET_WALLPAPERS:
      return {
        ...state,
        wallpapers: action.wallpapers
      };

    case ADD_FAVORITE:
      const updatedFav = state.wallpapers.find(
        wallpaper => wallpaper.key === action.addedFavoriteKey
      );
      return {
        ...state,
        favorites: state.favorites.concat(updatedFav)
      };

    case REMOVE_FAVORITE:
      const filterFav = state.favorites.filter(
        wallpaper => wallpaper.key !== action.removedFavoriteKey
      );
      return {
        ...state,
        favorites: filterFav
      };
    case LOAD_FAVORITES:
      return {
        ...state,
        favorites: action.favWallpapers
      };

    default:
      return state;
  }
};

export default wallpapers;
