import React, { Component } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { createReduxStore } from '../store';

class Store extends Component {
  render() {
    const { children, reducers } = this.props;
    const store = createReduxStore(reducers);

    return <Provider store={store}>{children}</Provider>;
  }
}

Store.propTypes = {
  reducers: PropTypes.arrayOf(PropTypes.number).isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Store;
