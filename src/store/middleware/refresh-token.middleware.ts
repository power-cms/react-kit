import { Dispatch } from 'react';
import { Action, Middleware, MiddlewareAPI } from 'redux';
import { Actions, ActionTypes } from '../domain/auth/auth.actions';

let deffered: Action[] = [];

export const refreshTokenMiddleware: Middleware = ({ dispatch, getState }: MiddlewareAPI) => (
  next: Dispatch<any>
) => async action => {
  try {
    return await next(action);
  } catch (e) {
    if (!e.isUnauthenticated) {
      throw e;
    }

    deffered.push(action);

    const {
      auth: { refreshToken },
    } = getState();

    if (!refreshToken) {
      throw e;
    }

    const resAction = await dispatch(Actions.refreshToken({ refreshToken }) as any);

    if (resAction.type === ActionTypes.REFRESH_TOKEN.SUCCESS) {
      for (const defferedAction of deffered) {
        dispatch(defferedAction);
      }
    } else {
      dispatch(Actions.logout());
    }

    deffered = [];
  }
};
