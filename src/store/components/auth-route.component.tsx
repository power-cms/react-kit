import { ReactElement } from 'react';

interface IProps {
  isAuthenticated: boolean;
  authenticatedComponent: ReactElement;
  loginComponent: ReactElement;
}

export const AuthRoute = ({ isAuthenticated, authenticatedComponent, loginComponent }: IProps) => {
  return isAuthenticated ? authenticatedComponent : loginComponent;
};
