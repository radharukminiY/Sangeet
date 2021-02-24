import React, {createContext, useReducer} from 'react';
import fetchData from '../Data';
import searchReducer, {initialState} from '../reducers/searchReducer';

export const SearchContext = createContext();

const SearchContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const startSearch = async (txt) => {
    // Clear state & set search text to show loading spinner
    await dispatch({type: 'GET_READY_TO_SEARCH', data: txt});

    await fetchData('search?limit=48&q=' + txt)
      .then((res) => {
        // If no results, set 'null' to show 'no results' message
        //const data = res.total === 0 ? null : res.data;
        dispatch({type: 'ON_SUCCESS', data: res.data});
      })
      .catch((err) => {
        console.log(err);
        dispatch({type: 'ON_FAILURE'});
      });
  };

  return <SearchContext.Provider value={{state, startSearch}}>{children}</SearchContext.Provider>;
};

export default SearchContextProvider;
