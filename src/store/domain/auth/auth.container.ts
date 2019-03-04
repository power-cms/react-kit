import { ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { reduxForm } from 'redux-form';
import { IAppState } from '../../store';
import { Actions } from './auth.actions';
import { ICredentials } from './auth.model';

const FORM_NAME = 'login';

const login = <T>(component: ComponentType<any>): ComponentType<T> =>
  reduxForm({
    form: FORM_NAME,
    onSubmit: async (data: ICredentials, dispatch: Dispatch<any>) => dispatch(Actions.login(data)),
    onSubmitSuccess: (result, dispatch, { history, successLink }: any) => history.push(successLink),
  })(component);

const auth = <T>(component: ComponentType<any>): ComponentType<T> =>
  connect(({ auth: { token } }: IAppState) => ({ isAuthenticated: !!token }))(component);

const logout = <T>(component: ComponentType<any>): ComponentType<T> =>
  connect(
    undefined,
    (dispatch: Dispatch<any>) => ({
      logout: () => dispatch(Actions.logout()),
    })
  )(component);

export { login, logout, auth };
