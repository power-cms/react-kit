import { Middleware } from 'redux';
import { SubmissionError } from 'redux-form';

class UnauthenticatedError extends Error {
  public static create(): UnauthenticatedError {
    return new UnauthenticatedError('User is unauthenticated');
  }

  public isUnauthenticated = true;
}

export const errorMiddleware: Middleware = () => next => action => {
  if (action.payload && action.payload.status === 400) {
    if (action.payload.response.data.message) {
      throw new SubmissionError({ _error: action.payload.response.data.message });
    }

    const errors = action.payload.response.data.reduce(
      (obj: any, { path, message }: any) => ({ ...obj, [path]: message }),
      {}
    );

    throw new SubmissionError(errors);
  }

  if (action.payload && action.payload.status === 401) {
    throw UnauthenticatedError.create();
  }

  return next(action);
};
