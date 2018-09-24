import { SAVE_ICONS } from "../actions/actionTypes";

const initialState = {
  icons: []
};

const icons = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ICONS:
      return {
        ...state,
        icons: action.icons
      };

    default:
      return state;
  }
};

export default icons;
