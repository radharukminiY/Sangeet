import React, {useContext, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {SearchContext} from '../contexts/SearchContext';
import './Header.css';

const Header = ({history, location}) => {
  const [searchText, setSearchText] = useState('');

  const {startSearch} = useContext(SearchContext);

  const setText = (e) => setSearchText(e.target.value);

  const isHomePage = () => location.pathname === '/';

  const handleKeyDown = (e) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      searchText.trim() !== '' && runSearch();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchText.trim() !== '' && runSearch();
  };

  const runSearch = () => {
    startSearch(searchText);
    history.push('/');
  };

  return (
    <div id="header">
      <Link to="/" id="brand">
        Music-Deezer
      </Link>
      {!isHomePage() && (
        // Wrapped with form for mobile support
        <form id="header-search-form" onSubmit={handleSubmit}>
          <input
            id="header-search-bar"
            type="text"
            onChange={setText}
            onKeyDown={handleKeyDown}
            value={searchText}
            placeholder="Search for music..."
          />
        </form>
      )}
    </div>
  );
};

export default withRouter(Header);
