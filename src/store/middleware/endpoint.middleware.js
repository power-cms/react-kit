import { RSAA } from 'redux-api-middleware';

const API_URL = process.env.REACT_APP_BACKEND_ENDPOINT;

const prepareEndpoint = ({ endpoint }) => {
  endpoint = endpoint.replace(/^\//, '');
  const baseUrl = API_URL.replace(/\/$/, '');

  return `${baseUrl}/${endpoint}`;
};

export const endpointMiddleware = () => next => action => {
  const callAPI = action[RSAA];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  return next({
    [RSAA]: { ...callAPI, endpoint: prepareEndpoint(callAPI) },
  });
};
