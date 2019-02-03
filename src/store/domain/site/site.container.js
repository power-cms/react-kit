import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Actions } from './site.actions';
import { matchId } from '../../matchers/id.matcher';

export const getSites = component =>
  connect(
    ({ site: { data, isLoading, pagination } }) => ({ data, isLoading, pagination }),
    dispatch => ({
      getData: page => dispatch(Actions.getAll(page)),
      delete: site => dispatch(Actions.delete(site)),
    })
  )(component);

export const createSite = component =>
  reduxForm({
    form: 'site-create',
    onSubmit: async (data, dispatch) => dispatch(Actions.create(data)),
    onSubmitSuccess: (result, dispatch, { history }) => history.push('/sites'),
  })(component);

export const updateSite = component =>
  compose(
    connect(({ site: { data } }, { match: { params: { id } } }) => ({ initialValues: matchId(data, id) })),
    reduxForm({
      form: 'site-update',
      onSubmit: async (
        data,
        dispatch,
        {
          match: {
            params: { id },
          },
        }
      ) => dispatch(Actions.update(id, data)),
      onSubmitSuccess: (result, dispatch, { history }) => history.push('/sites'),
    })
  )(component);
