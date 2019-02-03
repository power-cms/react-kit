import { ActionTypes } from './auth.actions';
import * as jwt from 'jsonwebtoken';

const localStorageKey = String(process.env.REACT_APP_LOCAL_STORAGE_KEY);
const token = localStorage.getItem(localStorageKey);

const initialState = {
  isLoading: false,
  token: token,
  user: token ? jwt.decode(token) : null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.LOGIN.SUCCESS:
      localStorage.setItem(localStorageKey, action.payload.accessToken);

      return {
        ...state,
        isLoading: false,
        token: action.payload.accessToken,
        user: jwt.decode(action.payload.accessToken),
      };

    case ActionTypes.LOGIN.FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
