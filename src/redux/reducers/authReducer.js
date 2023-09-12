import * as types from "../actionsTypes/authActionTypes";
const initialState = {
  isLoading: true,
  isAuthenticated: false,
  user: {},
  adminUser: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_UP:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
      case types.SIGN_IN:
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
        };
        case types.RESET_PASSWORD:
          return {
            ...state,
            isAuthenticated: true,
            user: action.payload,
          };
        case types.SET_USER:
          return {
            ...state,
            isAuthenticated: true,
            adminUser: action.payload,
          };
        case types.CHECK_SIGN_IN:
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
      case types.SET_DELETE_USER:
        return {
          ...state,
          isLoading: action.payload,
        };
    default:
      return state;
  }
};

export default authReducer;
