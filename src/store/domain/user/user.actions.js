import { RSAA } from 'redux-api-middleware';

export const ActionTypes = {
  GET_ALL: {
    REQUEST: 'Users/GET_ALL/REQUEST',
    SUCCESS: 'Users/GET_ALL/SUCCESS',
    FAILURE: 'Users/GET_ALL/FAILURE',
  },
  UPDATE: {
    REQUEST: 'Users/UPDATE/REQUEST',
    SUCCESS: 'Users/UPDATE/SUCCESS',
    FAILURE: 'Users/UPDATE/FAILURE',
  },
};

export const Actions = {
  getAll: (page = 1) => ({
    [RSAA]: {
      endpoint: `/users?page=${page}`,
      method: 'GET',
      types: [ActionTypes.GET_ALL.REQUEST, ActionTypes.GET_ALL.SUCCESS, ActionTypes.GET_ALL.FAILURE],
    },
  }),
  update: (id, { username, email, avatar }) => ({
    [RSAA]: {
      endpoint: `/users/${id}`,
      method: 'PUT',
      body: { username, email, avatar },
      types: [ActionTypes.UPDATE.REQUEST, ActionTypes.UPDATE.SUCCESS, ActionTypes.UPDATE.FAILURE],
    },
  }),
};
