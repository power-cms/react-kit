import { Action } from 'redux';
import { RSAA, RSAAction } from 'redux-api-middleware';
import { ICredentials, ITokens } from './auth.model';

export const ActionTypes = {
  LOGIN: {
    REQUEST: 'Auth/GET_ALL/REQUEST',
    SUCCESS: 'Auth/GET_ALL/SUCCESS',
    FAILURE: 'Auth/GET_ALL/FAILURE',
  },
  REFRESH_TOKEN: {
    REQUEST: 'Auth/REFRESH_TOKEN/REQUEST',
    SUCCESS: 'Auth/REFRESH_TOKEN/SUCCESS',
    FAILURE: 'Auth/REFRESH_TOKEN/FAILURE',
  },
  LOGOUT: 'Auth/LOGOUT',
};

export const Actions = {
  login: ({ login, password }: ICredentials): RSAAction => ({
    [RSAA]: {
      endpoint: '/auth/login',
      method: 'POST',
      body: { login, password },
      types: [ActionTypes.LOGIN.REQUEST, ActionTypes.LOGIN.SUCCESS, ActionTypes.LOGIN.FAILURE],
    },
  }),
  refreshToken: ({ refreshToken }: Partial<ITokens>): RSAAction => ({
    [RSAA]: {
      endpoint: '/auth/refresh_token',
      method: 'POST',
      body: { refreshToken },
      types: [ActionTypes.REFRESH_TOKEN.REQUEST, ActionTypes.REFRESH_TOKEN.SUCCESS, ActionTypes.REFRESH_TOKEN.FAILURE],
    },
  }),
  logout: (): Action => ({
    type: ActionTypes.LOGOUT,
  }),
};
