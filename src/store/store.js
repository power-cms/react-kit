import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { apiMiddleware } from 'redux-api-middleware';
import { reducer as authReducer } from './domain/auth/auth.reducer';
import { reducer as siteReducer } from './domain/site/site.reducer';
import { reducer as fileReducer } from './domain/file/file.reducer';
import { reducer as postReducer } from './domain/post/post.reducer';
import { reducer as userReducer } from './domain/user/user.reducer';
import { endpointMiddleware } from './middleware/endpoint.middleware';
import { bodyMiddleware } from './middleware/body.middleware';
import { formErrorMiddleware } from './middleware/form-error.middleware';
import { tokenMiddleware } from './middleware/token.middleware';

const createreducers = names => {
  const reducers = {
    auth: authReducer,
    user: userReducer,
    site: siteReducer,
    file: fileReducer,
    post: postReducer,
    form: formReducer,
  };

  return combineReducers(
    Object.keys(reducers).reduce((result, key) => {
      return names.indexOf(key) !== -1 ? { result, [key]: reducers[key] } : result;
    }, {})
  );
};

const composeEnhancers =
  process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

const middlewares = composeEnhancers(
  applyMiddleware(endpointMiddleware, tokenMiddleware, bodyMiddleware, apiMiddleware, formErrorMiddleware)
);

export const createReduxStore = reducers => createStore(createreducers(reducers), middlewares);
