import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createReduxStore } from '../store';

interface IProps {
  children: ReactElement | ReactElement[];
  reducers: string[];
  apiUrl: string;
}

export const Store = ({ children, reducers, apiUrl }: IProps) => {
  const { store, persistor } = createReduxStore(reducers, apiUrl);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
