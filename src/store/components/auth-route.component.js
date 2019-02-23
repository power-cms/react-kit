import PropTypes from 'prop-types';

const AuthRoute = ({ isAuthenticated, authenticatedComponent, loginComponent }) => {
  return isAuthenticated ? authenticatedComponent : loginComponent;
};

AuthRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  authenticatedComponent: PropTypes.node.isRequired,
  loginComponent: PropTypes.node.isRequired,
};

export { AuthRoute };
