import {
  MODAL_BOX_VISIBLE,
  MODAL_BOX_INVISIBLE,
  MORE_OPTIONS_VISIBLE,
  MORE_OPTIONS_INVISIBLE,
  SHARE_DIALOG_VISIBLE,
  SHARE_DIALOG_INVISIBLE,
  LOADING_START,
  LOADING_END
} from "./actionTypes";

// Modal Box
export const modalBoxVisible = () => {
  return {
    type: MODAL_BOX_VISIBLE
  };
};
export const modalBoxInvisible = () => {
  return {
    type: MODAL_BOX_INVISIBLE
  };
};

// More Options
export const moreOptionsVisible = () => {
  return {
    type: MORE_OPTIONS_VISIBLE
  };
};
export const moreOptionsInvisible = () => {
  return {
    type: MORE_OPTIONS_INVISIBLE
  };
};

// Share Dialog
export const shareDialogVisible = () => {
  return {
    type: SHARE_DIALOG_VISIBLE
  };
};
export const shareDialogInvisible = () => {
  return {
    type: SHARE_DIALOG_INVISIBLE
  };
};

// Spinner
export const loadingStart = () => {
  return {
    type: LOADING_START
  };
};
export const loadingEnd = () => {
  return {
    type: LOADING_END
  };
};
