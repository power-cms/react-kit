import { ComponentType, Dispatch } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { matchId } from '../../matchers/id.matcher';
import { IAppState } from '../../store';
import { Actions } from './user.actions';

const getAll = <T>(component: ComponentType<any>): ComponentType<T> =>
  connect(
    ({ user: { data, isLoading, pagination } }: IAppState) => ({ data, isLoading, pagination }),
    (dispatch: Dispatch<any>) => ({
      getData: (page: number) => dispatch(Actions.getAll(page)),
    })
  )(component);

const update = <T>(component: ComponentType<any>): ComponentType<T> =>
  compose<ComponentType<T>>(
    connect(
      (
        { user: { data } }: IAppState,
        {
          match: {
            params: { id },
          },
        }: any
      ) => ({
        initialValues: matchId(data, id),
      }),
      (
        dispatch: Dispatch<any>,
        {
          match: {
            params: { id },
          },
        }: any
      ) => ({
        getData: () => dispatch(Actions.get(id)),
      })
    ),
    reduxForm({
      form: 'user-update',
      onSubmit: async (
        data,
        dispatch,
        {
          match: {
            params: { id },
          },
        }: any
      ) => dispatch(Actions.update(id, data)),
      onSubmitSuccess: (result, dispatch, { history, successLink }: any) => history.push(successLink),
    })
  )(component);

export { getAll, update };
