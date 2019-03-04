import * as jwt from 'jsonwebtoken';
import { IPayloadAction } from '../../action';
import { IUser } from '../user/user.model';
import { ActionTypes } from './auth.actions';
import { IAuthState } from './auth.state';

const initialState: IAuthState = {
  isLoading: false,
  token: undefined,
  user: undefined,
};

export const reducer = (state = initialState, action: IPayloadAction): IAuthState => {
  switch (action.type) {
    case ActionTypes.LOGIN.REQUEST:
    case ActionTypes.REFRESH_TOKEN.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.LOGIN.SUCCESS:
    case ActionTypes.REFRESH_TOKEN.SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        user: jwt.decode(action.payload.accessToken) as IUser | undefined,
      };

    case ActionTypes.LOGIN.FAILURE:
    case ActionTypes.REFRESH_TOKEN.FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case ActionTypes.LOGOUT:
      return initialState;

    default:
      return state;
  }
};
