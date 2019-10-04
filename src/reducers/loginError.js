const initialStat = {
  authError: false
};

export const loginErrorReducer = (
  state = initialStat,
  action
) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      return { ...state, authError: false };

    case 'LOGIN_ERROR':
    case 'SIGNUP_ERROR':
      return { ...state, authError: action.payload };
    default:
      return state;
  }
};
