import { IPayloadAction } from '../../action';
import { ActionTypes as AuthActionTypes } from '../auth/auth.actions';
import { ActionTypes } from './settings.actions';
import { ISettingsState } from './settings.state';

const initialState: ISettingsState = {
  isLoading: false,
};

export const reducer = (state = initialState, action: IPayloadAction): ISettingsState => {
  switch (action.type) {
    case ActionTypes.GET.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.GET.SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };

    case ActionTypes.GET.FAILURE:
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
