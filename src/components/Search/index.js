import React, {useContext, useState} from 'react';
import {SearchContext} from '../../contexts/SearchContext';
import searchIcon from '../../images/search.svg';
import './search.css';

const SearchBar = () => {
  const [focused, setFocused] = useState(false);
  const [searchText, setSearchText] = useState('');

  const {startSearch} = useContext(SearchContext);

  const setText = (e) => setSearchText(e.target.value);

  const runSearch = () => {
    setFocused(false);
    searchText.trim() !== '' && startSearch(searchText);
  };

  const handleKeyDown = (e) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      runSearch();
    }
  };

  return (
    <div id="search-bar-wrapper">
      <div id="search-bg" className={focused ? 'focused-bg' : ''} />
      <div id="search-bar" onKeyDown={handleKeyDown} className={focused ? 'focused-bar' : ''}>
        <input
          type="text"
          onChange={setText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={searchText}
          placeholder="Search for music..."
        />
        <img onClick={runSearch} src={searchIcon} alt="Search icon" />
      </div>
    </div>
  );
};

export default SearchBar;
