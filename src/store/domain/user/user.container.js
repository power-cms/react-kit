import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Actions } from './user.actions';
import { Actions as FileActions } from '../file/file.actions';
import { matchId } from '../../matchers/id.matcher';

export const getUsers = component =>
  connect(
    ({ user: { data, isLoading, pagination } }) => ({ data, isLoading, pagination }),
    dispatch => ({
      getData: page => dispatch(Actions.getAll(page)),
    })
  )(component);

export const updateUser = component =>
  compose(
    connect(
      (
        { user: { data } },
        {
          match: {
            params: { id },
          },
        }
      ) => ({ initialValues: matchId(data, id) }),
      dispatch => ({
        uploadAvatar: file => dispatch(FileActions.create({ file })),
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
        }
      ) => dispatch(Actions.update(id, data)),
      onSubmitSuccess: (result, dispatch, { history }) => history.push('/users'),
    })
  )(component);
