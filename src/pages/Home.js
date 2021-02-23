import React from 'react';
import SearchBar from '../components/Search';
import ResultMusics from '../components/ResultMusic';
import PopularMusics from '../components/PopularMusic';

const Home = () => {
  return (
    <>
      <SearchBar />
      <ResultMusics />
      <PopularMusics />
    </>
  );
};

export default Home;
