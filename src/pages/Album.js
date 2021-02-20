import React, {useEffect, useReducer} from 'react';
import {Link} from 'react-router-dom';
import albumReducer, {initialState} from '../reducers/albumReducer';
import MusicList from '../components/MusicList';
import fetchData from '../Data';
import './album.css';

const Album = (props) => {
  const [state, dispatch] = useReducer(albumReducer, initialState);

  const {albumData, visibleMusics} = state;

  const id = props.match.params.id;

  useEffect(() => {
    fetchData('album/' + id)
      .then((res) => dispatch({type: 'SET_ALBUM_DATA', data: {...res}}))
      .catch(console.error);
  }, []);

  const loadMoreAlbums = () => {
    const aLen = albumData.tracks.data.length;
    const vaLen = visibleMusics.length;
    // If there are hidden albums
    if (aLen > vaLen) {
      // Show (up to) 8 more
      dispatch({
        type: 'SET_VISIBLE_MUSICS',
        data: [...visibleMusics, ...albumData.tracks.data.slice(vaLen, vaLen + 10)],
      });
    }
  };

  if (albumData) {
    const {cover_medium, title, artist, tracks} = albumData;

    return (
      <>
        <div id="album-header">
          <img id="album-img" src={cover_medium} alt={title} />
          <div id="album-info">
            <span id="album-title">{title}</span>
            <Link id="album-artist-name" to={'/artist/' + artist.id}>
              by {artist.name}
            </Link>
            <span id="album-tracks-count">{tracks.data.length} track(s)</span>
          </div>
        </div>
        <MusicList tracks={visibleMusics} cover={cover_medium} />
        {tracks.data.length != visibleMusics.length && (
          <p className="load-more" onClick={loadMoreAlbums}>
            Load more
          </p>
        )}
      </>
    );
  } else {
    return <div className="loading full-page" />;
  }
};

export default Album;
