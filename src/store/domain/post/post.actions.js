import { RSAA } from 'redux-api-middleware';

export const ActionTypes = {
  GET_ALL: {
    REQUEST: 'Posts/GET_ALL/REQUEST',
    SUCCESS: 'Posts/GET_ALL/SUCCESS',
    FAILURE: 'Posts/GET_ALL/FAILURE',
  },
  CREATE: {
    REQUEST: 'Posts/CREATE/REQUEST',
    SUCCESS: 'Posts/CREATE/SUCCESS',
    FAILURE: 'Posts/CREATE/FAILURE',
  },
};

export const Actions = {
  getAll: () => ({
    [RSAA]: {
      endpoint: '/posts',
      method: 'GET',
      types: [ActionTypes.GET_ALL.REQUEST, ActionTypes.GET_ALL.SUCCESS, ActionTypes.GET_ALL.FAILURE],
    },
  }),
  create: ({ title, content, siteId }) => ({
    [RSAA]: {
      endpoint: '/posts',
      method: 'POST',
      body: { title, content, siteId },
      types: [ActionTypes.CREATE.REQUEST, ActionTypes.CREATE.SUCCESS, ActionTypes.CREATE.FAILURE],
    },
  }),
};
