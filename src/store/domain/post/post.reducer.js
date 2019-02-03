import { ActionTypes } from './post.actions';

const initialState = {
  isLoading: false,
  data: [],
  pagination: {
    page: 1,
    totalPages: 1,
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ALL.REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.GET_ALL.SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        pagination: {
          page: Number(action.payload.page),
          totalPages: Number(action.payload.totalPages),
        },
      };

    case ActionTypes.GET_ALL.FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
