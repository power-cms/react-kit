import { reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Actions } from './post.actions';
import { Actions as SiteActions } from '../site/site.actions';
import { matchId } from '../../matchers/id.matcher';

export const getPosts = component =>
  connect(
    ({ post: { data, isLoading, pagination } }) => ({ data, isLoading, pagination }),
    dispatch => ({
      getData: page => dispatch(Actions.getAll(page)),
    })
  )(component);

export const createPost = component =>
  compose(
    connect(
      ({ site: { data } }) => ({ sites: data.filter(site => site.type === 'blog') }),
      dispatch => ({
        getSites: () => dispatch(SiteActions.getAll()),
      })
    ),
    reduxForm({
      form: 'post-create',
      onSubmit: async (data, dispatch) => dispatch(Actions.create(data)),
      onSubmitSuccess: (result, dispatch, { history }) => history.push('/posts'),
    })
  )(component);

export const updatePost = component =>
  compose(
    connect(({ site: { data } }, { match: { params: { id } } }) => ({ initialValues: matchId(data, id) })),
    reduxForm({
      form: 'post-update',
      onSubmit: async (
        data,
        dispatch,
        {
          match: {
            params: { id },
          },
        }
      ) => dispatch(Actions.update(id, data)),
      onSubmitSuccess: (result, dispatch, { history }) => history.push('/posts'),
    })
  )(component);
