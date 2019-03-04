import { Dispatch } from 'react';
import { AnyAction, Middleware } from 'redux';
import { RSAA } from 'redux-api-middleware';

const prepareEndpoint = ({ endpoint }: { endpoint: string }, apiUrl: string) => {
  endpoint = endpoint.replace(/^\//, '');
  const baseUrl = apiUrl.replace(/\/$/, '');

  return `${baseUrl}/${endpoint}`;
};

type IMiddlewareFactory = (apiUrl: string) => Middleware;

export const endpointMiddleware: IMiddlewareFactory = (apiUrl: string) => () => (next: Dispatch<any>) => (
  action: AnyAction
) => {
  const callAPI = action[RSAA];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  return next({
    [RSAA]: { ...callAPI, endpoint: prepareEndpoint(callAPI, apiUrl) },
  });
};
