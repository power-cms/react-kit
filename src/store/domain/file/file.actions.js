import { RSAA } from 'redux-api-middleware';

export const ActionTypes = {
  GET_ALL: {
    REQUEST: 'Files/GET_ALL/REQUEST',
    SUCCESS: 'Files/GET_ALL/SUCCESS',
    FAILURE: 'Files/GET_ALL/FAILURE',
  },
  CREATE: {
    REQUEST: 'Files/CREATE/REQUEST',
    SUCCESS: 'Files/CREATE/SUCCESS',
    FAILURE: 'Files/CREATE/FAILURE',
  },
};

export const Actions = {
  getAll: page => ({
    [RSAA]: {
      endpoint: `/files?page=${page}&limit=12`,
      method: 'GET',
      types: [ActionTypes.GET_ALL.REQUEST, ActionTypes.GET_ALL.SUCCESS, ActionTypes.GET_ALL.FAILURE],
    },
  }),
  create: ({ file }) => ({
    [RSAA]: {
      endpoint: '/files',
      method: 'POST',
      body: { file },
      multipart: true,
      types: [ActionTypes.CREATE.REQUEST, ActionTypes.CREATE.SUCCESS, ActionTypes.CREATE.FAILURE],
    },
  }),
};
