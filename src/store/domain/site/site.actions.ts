import { RSAA, RSAAction } from 'redux-api-middleware';
import { ISite } from './site.model';

export const ActionTypes = {
  GET_ALL: {
    REQUEST: 'Sites/GET_ALL/REQUEST',
    SUCCESS: 'Sites/GET_ALL/SUCCESS',
    FAILURE: 'Sites/GET_ALL/FAILURE',
  },
  GET: {
    REQUEST: 'Sites/GET/REQUEST',
    SUCCESS: 'Sites/GET/SUCCESS',
    FAILURE: 'Sites/GET/FAILURE',
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
  getAll: (page = 1): RSAAction => ({
    [RSAA]: {
      endpoint: `/sites?page=${page}`,
      method: 'GET',
      types: [ActionTypes.GET_ALL.REQUEST, ActionTypes.GET_ALL.SUCCESS, ActionTypes.GET_ALL.FAILURE],
    },
  }),
  get: (id: string): RSAAction => ({
    [RSAA]: {
      endpoint: `/sites/${id}`,
      method: 'GET',
      types: [ActionTypes.GET.REQUEST, ActionTypes.GET.SUCCESS, ActionTypes.GET.FAILURE],
    },
  }),
  create: ({ type, title, url, content }: Partial<ISite>): RSAAction => ({
    [RSAA]: {
      endpoint: '/sites',
      method: 'POST',
      body: { type, title, url, content },
      types: [ActionTypes.CREATE.REQUEST, ActionTypes.CREATE.SUCCESS, ActionTypes.CREATE.FAILURE],
    },
  }),
  update: (id: string, { title, url, content }: Partial<ISite>): RSAAction => ({
    [RSAA]: {
      endpoint: `/sites/${id}`,
      method: 'PUT',
      body: { title, url, content },
      types: [ActionTypes.UPDATE.REQUEST, ActionTypes.UPDATE.SUCCESS, ActionTypes.UPDATE.FAILURE],
    },
  }),
  delete: (id: string): RSAAction => ({
    [RSAA]: {
      endpoint: `/sites/${id}`,
      method: 'DELETE',
      types: [ActionTypes.DELETE.REQUEST, ActionTypes.DELETE.SUCCESS, ActionTypes.DELETE.FAILURE],
    },
  }),
};
