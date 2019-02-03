import { reduxForm } from 'redux-form';
import { Actions } from './auth.actions';

const FORM_NAME = 'login';

export const login = component =>
  reduxForm({
    form: FORM_NAME,
    onSubmit: async (data, dispatch) => dispatch(Actions.login(data)),
    onSubmitSuccess: (result, dispatch, { history }) => history.push('/'),
  })(component);
