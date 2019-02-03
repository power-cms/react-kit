import { RSAA } from 'redux-api-middleware';

const createFormData = body => {
  const formData = new FormData();

  Object.keys(body).map(key => formData.append(key, body[key]));

  return formData;
};

export const bodyMiddleware = () => next => action => {
  const rsaa = action[RSAA];

  if (typeof rsaa === 'undefined' || !rsaa.body) {
    return next(action);
  }

  const { multipart, ...callAPI } = rsaa;

  const headers = multipart ? callAPI.headers : { ...callAPI.headers, 'Content-Type': 'application/json' };
  const body = multipart ? createFormData(callAPI.body) : JSON.stringify(callAPI.body);

  return next({
    [RSAA]: {
      ...callAPI,
      headers,
      body,
    },
  });
};
