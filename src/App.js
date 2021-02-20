import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ContextProvider from './contexts/Context';
import SearchContextProvider from './contexts/SearchContext';
import Header from './components/Header';
import Home from './pages/Home';
import Album from './pages/Album';
import Artist from './pages/Artist';
import Player from './components/Player';

const App = () => {
  return (
    <BrowserRouter>
      <ContextProvider>
        <SearchContextProvider>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/album/:id" component={Album} />
            <Route path="/artist/:id" component={Artist} />
          </Switch>
          <Player />
        </SearchContextProvider>
      </ContextProvider>
    </BrowserRouter>
  );
};

export default App;
