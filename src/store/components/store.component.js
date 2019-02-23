import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { createReduxStore } from '../store';

const Store = ({ children, reducers }) => {
  const store = createReduxStore(reducers);

  return <Provider store={store}>{children}</Provider>;
};

Store.propTypes = {
  reducers: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export { Store };
