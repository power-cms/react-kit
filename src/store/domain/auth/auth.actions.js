import { RSAA } from 'redux-api-middleware';

export const ActionTypes = {
  LOGIN: {
    REQUEST: 'Auth/GET_ALL/REQUEST',
    SUCCESS: 'Auth/GET_ALL/SUCCESS',
    FAILURE: 'Auth/GET_ALL/FAILURE',
  },
};

export const Actions = {
  login: ({ login, password }) => ({
    [RSAA]: {
      endpoint: '/auth/login',
      method: 'POST',
      body: { login, password },
      types: [ActionTypes.LOGIN.REQUEST, ActionTypes.LOGIN.SUCCESS, ActionTypes.LOGIN.FAILURE],
    },
  }),
};
