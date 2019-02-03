import { RSAA } from 'redux-api-middleware';

export const tokenMiddleware = store => next => action => {
  const callAPI = action[RSAA];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const {
    auth: { token },
  } = store.getState();

  if (!token) {
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
