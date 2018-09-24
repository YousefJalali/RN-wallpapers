import {
  SHARE_DIALOG_VISIBLE,
  SHARE_DIALOG_INVISIBLE,
  MORE_OPTIONS_VISIBLE,
  MORE_OPTIONS_INVISIBLE,
  MODAL_BOX_VISIBLE,
  MODAL_BOX_INVISIBLE,
  LOADING_START,
  LOADING_END
} from "../actions/actionTypes";

const initialState = {
  shareDialogVisible: false,
  moreOptionsVisible: false,
  modalBoxVisible: false,
  loading: false
};

const ui = (state = initialState, action) => {
  switch (action.type) {
    // Share Dialog
    case SHARE_DIALOG_VISIBLE:
      return {
        shareDialogVisible: true
      };
    case SHARE_DIALOG_INVISIBLE:
      return {
        shareDialogVisible: false
      };

    // More Options
    case MORE_OPTIONS_VISIBLE:
      return {
        moreOptionsVisible: true
      };
    case MORE_OPTIONS_INVISIBLE:
      return {
        moreOptionsVisible: false
      };

    // Modal Box
    case MODAL_BOX_VISIBLE:
      return {
        modalBoxVisible: true
      };
    case MODAL_BOX_INVISIBLE:
      return {
        modalBoxVisible: false
      };

    // Spinner
    case LOADING_START:
      return {
        loading: true
      };
    case LOADING_END:
      return {
        loading: false
      };

    default:
      return state;
  }
};

export default ui;
