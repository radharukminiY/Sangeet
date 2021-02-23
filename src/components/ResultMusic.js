import React, {useContext, useEffect, useState} from 'react';
import {SearchContext} from '../contexts/SearchContext';
import MusicCard from './MusicCards';
import MusicCardPlaceholder from './MusicCardContainer';

const ResultMusics = () => {
  const [visibleResults, setVisibleResults] = useState([]);

  const {state} = useContext(SearchContext);

  const {results, searchTxt, loading, error} = state;

  const loadMoreResults = () => {
    const rLen = results?.length;
    const vrLen = visibleResults.length;
    // If there are hidden results
    if (rLen > vrLen) {
      // Show (up to) 8 more
      setVisibleResults((oldArr) => [...oldArr, ...results.slice(vrLen, vrLen + 8)]);
    }
  };

  useEffect(() => {
    const rLen = results?.length || 0;
    const vrLen = visibleResults.length;
    // Load first 8 results
    rLen > 0 && vrLen === 0 && loadMoreResults();
    rLen === 0 && setVisibleResults([]);
  }, [results]);

  const resultComponents = visibleResults.map((track) => {
    let minutes = Math.floor(track.duration / 60).toString();
    let seconds = (track.duration % 60).toString();
    let duration = `${minutes.length === 1 ? '0' + minutes : minutes}:${
      seconds.length === 1 ? '0' + seconds : seconds
    }`;
    return <MusicCard key={track.id} track={track} duration={duration} />;
  });

  if (loading) {
    return (
      <>
        <h2 className="result-section-header">Searching '{searchTxt}'</h2>
        <div className="result-section">
          <MusicCardPlaceholder />
          <MusicCardPlaceholder />
          <MusicCardPlaceholder />
        </div>
      </>
    );
  } else if (searchTxt !== '' && error === '') {
    return results.length === 0 ? (
      <h2 className="result-section-header">No results for '{searchTxt}'</h2>
    ) : (
      <>
        <h2 className="result-section-header">Results for '{searchTxt}'</h2>
        <div className="result-section">{resultComponents}</div>
        {results.length !== visibleResults.length && (
          <p className="load-more" onClick={loadMoreResults}>
            Load more
          </p>
        )}
      </>
    );
  } else if (error !== '') {
    return <span className="search-error">{error}</span>;
  } else {
    return <div />;
  }
};

export default ResultMusics;
