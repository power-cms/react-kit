import { SubmissionError } from 'redux-form';

export const formErrorMiddleware = () => next => action => {
  if (action.payload && action.payload.status === 400) {
    if (action.payload.response.data.message) {
      throw new SubmissionError({ _error: action.payload.response.data.message });
    }

    const errors = action.payload.response.data
      .map(({ context: { key }, message }) => ({ key, message }))
      .reduce((obj, { key, message }) => ({ ...obj, [key]: message }), {});

    throw new SubmissionError(errors);
  }

  return next(action);
};
