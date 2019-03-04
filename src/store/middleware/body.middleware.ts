import { Dispatch } from 'react';
import { AnyAction, Middleware } from 'redux';
import { RSAA } from 'redux-api-middleware';

const createFormData = (body: any): FormData => {
  const formData = new FormData();

  Object.keys(body).forEach(key => formData.append(key, body[key]));

  return formData;
};

export const bodyMiddleware: Middleware = () => (next: Dispatch<any>) => (action: AnyAction) => {
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
