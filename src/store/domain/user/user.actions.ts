import { RSAA, RSAAction } from 'redux-api-middleware';
import { IUser } from './user.model';

export const ActionTypes = {
  GET_ALL: {
    REQUEST: 'Users/GET_ALL/REQUEST',
    SUCCESS: 'Users/GET_ALL/SUCCESS',
    FAILURE: 'Users/GET_ALL/FAILURE',
  },
  GET: {
    REQUEST: 'Users/GET/REQUEST',
    SUCCESS: 'Users/GET/SUCCESS',
    FAILURE: 'Users/GET/FAILURE',
  },
  UPDATE: {
    REQUEST: 'Users/UPDATE/REQUEST',
    SUCCESS: 'Users/UPDATE/SUCCESS',
    FAILURE: 'Users/UPDATE/FAILURE',
  },
};

export const Actions = {
  getAll: (page = 1): RSAAction => ({
    [RSAA]: {
      endpoint: `/users?page=${page}`,
      method: 'GET',
      types: [ActionTypes.GET_ALL.REQUEST, ActionTypes.GET_ALL.SUCCESS, ActionTypes.GET_ALL.FAILURE],
    },
  }),
  get: (id: string): RSAAction => ({
    [RSAA]: {
      endpoint: `/users/${id}`,
      method: 'GET',
      types: [ActionTypes.GET.REQUEST, ActionTypes.GET.SUCCESS, ActionTypes.GET.FAILURE],
    },
  }),
  update: (id: string, { username, email }: Partial<IUser>): RSAAction => ({
    [RSAA]: {
      endpoint: `/users/${id}`,
      method: 'PUT',
      body: { username, email },
      types: [ActionTypes.UPDATE.REQUEST, ActionTypes.UPDATE.SUCCESS, ActionTypes.UPDATE.FAILURE],
    },
  }),
};
