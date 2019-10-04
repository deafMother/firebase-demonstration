const initialState = {
  error: false,
  show: false
};

export const popUpReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'SHOW_POPUP_ERROR':
      return {
        ...state,
        error: true,
        show: true,
        msg: action.msg
      };
    case 'SHOW_POPUP_SUCCESS':
      return {
        ...state,
        error: false,
        show: true,
        msg: action.msg
      };
    case 'REMOVE_POPUP':
      return { ...state, show: false, msg: action.msg };
    default:
      return state;
  }
};

export default popUpReducer;
