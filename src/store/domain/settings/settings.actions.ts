import { RSAA, RSAAction } from 'redux-api-middleware';
import { ISettings } from './settings.model';

export const ActionTypes = {
  GET: {
    REQUEST: 'Settings/GET/REQUEST',
    SUCCESS: 'Settings/GET/SUCCESS',
    FAILURE: 'Settings/GET/FAILURE',
  },
  UPDATE: {
    REQUEST: 'Settings/UPDATE/REQUEST',
    SUCCESS: 'Settings/UPDATE/SUCCESS',
    FAILURE: 'Settings/UPDATE/FAILURE',
  },
};

export const Actions = {
  get: (): RSAAction => ({
    [RSAA]: {
      endpoint: `/settings/all`,
      method: 'GET',
      types: [ActionTypes.GET.REQUEST, ActionTypes.GET.SUCCESS, ActionTypes.GET.FAILURE],
    },
  }),
  update: ({ title }: Partial<ISettings>): RSAAction => ({
    [RSAA]: {
      endpoint: `/settings/all`,
      method: 'PUT',
      body: { title },
      types: [ActionTypes.UPDATE.REQUEST, ActionTypes.UPDATE.SUCCESS, ActionTypes.UPDATE.FAILURE],
    },
  }),
};
