export const initialState = {
  loading: true,
  popularNow: [],
  error: '',
};

const popularReducer = (state, action) => {
  switch (action.type) {
    case 'ON_SUCCESS':
      return {error: '', popularNow: action.data, loading: false};
    case 'ON_FAILURE':
      return {error: 'Something went wrong!', popularNow: [], loading: false};
    default:
      return state;
  }
};

export default popularReducer;
