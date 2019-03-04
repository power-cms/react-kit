import { ComponentType, Dispatch } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { matchId } from '../../matchers/id.matcher';
import { IAppState } from '../../store';
import { Actions } from './site.actions';

const getAll = <T>(component: ComponentType<any>): ComponentType<T> =>
  connect(
    ({ site: { data, isLoading, pagination } }: IAppState) => ({ data, isLoading, pagination }),
    (dispatch: Dispatch<any>) => ({
      getData: (page: number) => dispatch(Actions.getAll(page)),
      delete: (siteId: string) => dispatch(Actions.delete(siteId)),
    })
  )(component);

const create = <T>(component: ComponentType<any>): ComponentType<T> =>
  reduxForm({
    form: 'site-create',
    onSubmit: async (data, dispatch) => dispatch(Actions.create(data)),
    onSubmitSuccess: (result, dispatch, { history, successLink }: any) => history.push(successLink),
  })(component);

const update = <T>(component: ComponentType<any>): ComponentType<T> =>
  compose<ComponentType<T>>(
    connect(
      (
        { site: { data } }: IAppState,
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
        delete: (siteId: string) => dispatch(Actions.delete(siteId)),
      })
    ),
    reduxForm({
      form: 'site-update',
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

export { getAll, create, update };
