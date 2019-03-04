import { IPayloadAction } from '../../action';
import { ActionTypes as AuthActionTypes } from '../auth/auth.actions';
import { ActionTypes } from './user.actions';
import { IUserState } from './user.state';

const initialState: IUserState = {
  isLoading: false,
  data: [],
  pagination: {
    page: 1,
    totalPages: 1,
  },
};

export const reducer = (state = initialState, action: IPayloadAction): IUserState => {
  switch (action.type) {
    case ActionTypes.GET_ALL.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.GET_ALL.SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        pagination: {
          page: Number(action.payload.page),
          totalPages: Number(action.payload.totalPages),
        },
      };

    case ActionTypes.GET_ALL.FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case AuthActionTypes.LOGOUT:
      return initialState;

    default:
      return state;
  }
};
