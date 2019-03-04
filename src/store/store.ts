import { applyMiddleware, combineReducers, compose, createStore, Reducer, Store } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { reducer as formReducer } from 'redux-form';
import { Persistor, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer as authReducer } from './domain/auth/auth.reducer';
import { IAuthState } from './domain/auth/auth.state';
import { reducer as settingsReducer } from './domain/settings/settings.reducer';
import { ISettingsState } from './domain/settings/settings.state';
import { reducer as siteReducer } from './domain/site/site.reducer';
import { ISiteState } from './domain/site/site.state';
import { reducer as userReducer } from './domain/user/user.reducer';
import { IUserState } from './domain/user/user.state';
import { bodyMiddleware } from './middleware/body.middleware';
import { endpointMiddleware } from './middleware/endpoint.middleware';
import { errorMiddleware } from './middleware/error.middleware';
import { refreshTokenMiddleware } from './middleware/refresh-token.middleware';
import { tokenMiddleware } from './middleware/token.middleware';

const createreducers = (names: string[]): Reducer => {
  const reducers = {
    auth: authReducer,
    form: formReducer,
    site: siteReducer,
    user: userReducer,
    settings: settingsReducer,
  };

  return combineReducers(
    Object.keys(reducers).reduce((result, key) => {
      return names.indexOf(key) !== -1 ? { ...result, [key]: (reducers as any)[key] } : result;
    }, {})
  );
};

const composeEnhancers =
  process.env.NODE_ENV === 'development' ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

const middlewares = (apiUrl: string) =>
  composeEnhancers(
    applyMiddleware(
      refreshTokenMiddleware,
      endpointMiddleware(apiUrl),
      tokenMiddleware,
      bodyMiddleware,
      apiMiddleware,
      errorMiddleware
    )
  );

export interface IAppState {
  auth: IAuthState;
  site: ISiteState;
  user: IUserState;
  settings: ISettingsState;
}

export interface IStorePersistor {
  store: Store;
  persistor: Persistor;
}

export const createReduxStore = (reducerNames: string[], apiUrl: string): IStorePersistor => {
  const reducers = persistReducer(
    {
      key: 'power-cms',
      storage,
    },
    createreducers(reducerNames)
  );

  const store = createStore(reducers, middlewares(apiUrl));
  const persistor = persistStore(store);

  return { store, persistor };
};
