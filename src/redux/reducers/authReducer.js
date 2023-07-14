import * as types from "../actionsTypes/authActionTypes";
const initialState = {
  isLoading: true,
  isAuthenticated: false,
  user: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case types.SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };
      case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
