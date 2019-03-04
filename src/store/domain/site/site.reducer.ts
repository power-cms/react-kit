import { IPayloadAction } from '../../action';
import { updateOrInsert } from '../../matchers/update.matcher';
import { ActionTypes as AuthActionTypes } from '../auth/auth.actions';
import { ActionTypes } from './site.actions';
import { ISiteState } from './site.state';

const initialState: ISiteState = {
  isLoading: false,
  data: [],
  pagination: {
    page: 1,
    totalPages: 1,
  },
};

export const reducer = (state = initialState, action: IPayloadAction): ISiteState => {
  switch (action.type) {
    case ActionTypes.GET.REQUEST:
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

    case ActionTypes.GET.SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: updateOrInsert(state.data, action.payload),
      };

    case ActionTypes.GET.FAILURE:
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
