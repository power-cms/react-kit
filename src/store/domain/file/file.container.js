import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Actions } from './file.actions';

export const getFiles = component =>
  connect(
    ({ file: { data, isLoading, pagination } }) => ({ data, isLoading, pagination }),
    dispatch => ({
      getData: page => dispatch(Actions.getAll(page)),
    })
  )(component);

const FORM_NAME = 'file';

export const createFile = component =>
  reduxForm({
    form: FORM_NAME,
    onSubmit: async (data, dispatch) => dispatch(Actions.create(data)),
    onSubmitSuccess: (result, dispatch, { history }) => history.push('/files'),
  })(component);
