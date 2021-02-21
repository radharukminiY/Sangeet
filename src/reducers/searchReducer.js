export const initialState = {
  loading: false,
  searchTxt: '',
  results: [],
  error: '',
};

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'GET_READY_TO_SEARCH':
      return {...initialState, loading: true, searchTxt: action.data};
    case 'ON_SUCCESS':
      return {...state, loading: false, results: action.data};
    case 'ON_FAILURE':
      return {...state, loading: false, error: 'Something went wrong!'};
    default:
      return state;
  }
};

export default searchReducer;
