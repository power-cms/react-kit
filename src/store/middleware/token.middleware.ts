import { Dispatch } from 'react';
import { AnyAction, Middleware, MiddlewareAPI } from 'redux';
import { RSAA } from 'redux-api-middleware';
import { ActionTypes } from '../domain/auth/auth.actions';

export const tokenMiddleware: Middleware = (store: MiddlewareAPI) => (next: Dispatch<any>) => (action: AnyAction) => {
  const callAPI = action[RSAA];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const {
    auth: { token },
  } = store.getState();

  if (!token || callAPI.types[0] === ActionTypes.REFRESH_TOKEN.REQUEST) {
    return next(action);
  }

  return next({
    [RSAA]: {
      ...callAPI,
      headers: {
        ...callAPI.headers,
        Authorization: `JWT ${token}`,
      },
    },
  });
};
