// login auth reducer
import * as ActionTypes from "../ActionTypes/ActionTypes";

export const User = (
  state = {
    loading: false,
    errmess: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.LOGGED_IN:
      return {
        ...state,
        errmess: null,
        newUser: action.payload[0],
        tkn: action.payload[1],
        loading: false,
      };

    case ActionTypes.LOADING:
      return {
        ...state,
        errmess: null,
        newUser: [],
        loading: true,
      };

    case ActionTypes.LOG_FAILED:
      return {
        ...state,
        errmess: action.payload,
        newUser: null,
        loading: false,
      };

    case ActionTypes.LOGOUT:
      return {
        ...state,
        errmess: null,
        User: null,
        loading: false,
      };

    case ActionTypes.EMAIL_SENT:
      return {
        ...state,
        regMess: null,
        regMail: action.payload,
        loading: false,
      };

    case ActionTypes.EMAIL_FAILED:
      return {
        ...state,
        regMess: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
