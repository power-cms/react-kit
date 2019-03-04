import { ComponentType, Dispatch } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { IAppState } from '../../store';
import { Actions } from './settings.actions';

const get = <T>(component: ComponentType<any>): ComponentType<T> =>
  connect(
    ({ settings: { data, isLoading } }: IAppState) => ({ data, isLoading }),
    (dispatch: Dispatch<any>) => ({
      getData: () => dispatch(Actions.get()),
    })
  )(component);

const update = <T>(component: ComponentType<any>): ComponentType<T> =>
  compose<ComponentType<T>>(
    connect(
      ({ settings: { data } }: IAppState) => ({
        initialValues: data,
      }),
      (dispatch: Dispatch<any>) => ({
        getData: () => dispatch(Actions.get()),
      })
    ),
    reduxForm({
      form: 'settings-update',
      onSubmit: async (data, dispatch) => dispatch(Actions.update(data)),
      onSubmitSuccess: (result, dispatch, { history, successLink }: any) => history.push(successLink),
    })
  )(component);

export { get, update };
