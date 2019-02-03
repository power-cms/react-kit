import { RSAA } from 'redux-api-middleware';

export const ActionTypes = {
  GET_ALL: {
    REQUEST: 'Sites/GET_ALL/REQUEST',
    SUCCESS: 'Sites/GET_ALL/SUCCESS',
    FAILURE: 'Sites/GET_ALL/FAILURE',
  },
  CREATE: {
    REQUEST: 'Sites/CREATE/REQUEST',
    SUCCESS: 'Sites/CREATE/SUCCESS',
    FAILURE: 'Sites/CREATE/FAILURE',
  },
  UPDATE: {
    REQUEST: 'Sites/UPDATE/REQUEST',
    SUCCESS: 'Sites/UPDATE/SUCCESS',
    FAILURE: 'Sites/UPDATE/FAILURE',
  },
  DELETE: {
    REQUEST: 'Sites/DELETE/REQUEST',
    SUCCESS: 'Sites/DELETE/SUCCESS',
    FAILURE: 'Sites/DELETE/FAILURE',
  },
};

export const Actions = {
  getAll: (page = 1) => ({
    [RSAA]: {
      endpoint: `/sites?page=${page}`,
      method: 'GET',
      types: [ActionTypes.GET_ALL.REQUEST, ActionTypes.GET_ALL.SUCCESS, ActionTypes.GET_ALL.FAILURE],
    },
  }),
  create: ({ type, title, url, content }) => ({
    [RSAA]: {
      endpoint: '/sites',
      method: 'POST',
      body: { type, title, url, content },
      types: [ActionTypes.CREATE.REQUEST, ActionTypes.CREATE.SUCCESS, ActionTypes.CREATE.FAILURE],
    },
  }),
  update: (id, { title, url, content }) => ({
    [RSAA]: {
      endpoint: `/sites/${id}`,
      method: 'PUT',
      body: { title, url, content },
      types: [ActionTypes.UPDATE.REQUEST, ActionTypes.UPDATE.SUCCESS, ActionTypes.UPDATE.FAILURE],
    },
  }),
  delete: id => ({
    [RSAA]: {
      endpoint: `/sites/${id}`,
      method: 'DELETE',
      types: [ActionTypes.DELETE.REQUEST, ActionTypes.DELETE.SUCCESS, ActionTypes.DELETE.FAILURE],
    },
  }),
};
