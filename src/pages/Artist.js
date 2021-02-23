import React, {useEffect, useReducer} from 'react';
import artistReducer, {initialState} from '../reducers/artistReducer';
import fetchData from '../Data';
import MusicList from '../components/MusicList';
import AlbumList from '../components/Albumlist';
import './artict.css';

const Album = (props) => {
  const [state, dispatch] = useReducer(artistReducer, initialState);

  const id = props.match.params.id;

  useEffect(() => {
    (async () => {
      await fetchArtist();
      await fetchTracks();
      await fetchAlbums();
    })();
  }, []);

  const fetchArtist = async () => {
    await fetchData('artist/' + id)
      .then((res) => dispatch({type: 'SET_ARTIST_DATA', data: {...res}}))
      .catch(console.error);
  };
  const fetchTracks = async () => {
    await fetchData('artist/' + id + '/top?limit=50')
      .then((res) => dispatch({type: 'SET_TRACKS', data: [...res.data]}))
      .catch(console.error);
  };

  const fetchAlbums = async () => {
    await fetchData('artist/' + id + '/albums?limit=48')
      .then((res) => dispatch({type: 'SET_ALBUMS', data: [...res.data]}))
      .catch(console.error);
  };

  const {artistData, musicsArr, albumsArr, visibleMusics, visibleAlbums} = state;

  const loadMoreMusics = () => {
    const mLen = musicsArr.length;
    const vmLen = visibleMusics.length;
    // If there are hidden tracks
    if (mLen > vmLen) {
      // Show (up to) 10 more
      dispatch({
        type: 'SET_VISIBLE_MUSICS',
        data: [...visibleMusics, ...musicsArr.slice(vmLen, vmLen + 10)],
      });
    }
  };

  const loadMoreAlbums = () => {
    const aLen = albumsArr.length;
    const vaLen = visibleAlbums.length;
    // If there are hidden albums
    if (aLen > vaLen) {
      // Show (up to) 8 more
      dispatch({
        type: 'SET_VISIBLE_ALBUMS',
        data: [...visibleAlbums, ...albumsArr.slice(vaLen, vaLen + 8)],
      });
    }
  };

  if (artistData?.name) {
    return (
      <>
        <div id="artist-header">
          <img id="artist-img" src={artistData.picture_medium} alt={artistData.name} />
          <span id="artist-name">{artistData.name}</span>
        </div>

        <p className="section-header">Tracks ({musicsArr.length})</p>

        {visibleMusics.length > 0 ? <MusicList tracks={visibleMusics} /> : <div className="loading" />}

        {musicsArr.length != visibleMusics.length && (
          <p className="load-more" onClick={loadMoreMusics}>
            Load more
          </p>
        )}

        <p className="section-header">Albums ({albumsArr.length})</p>

        {visibleAlbums.length > 0 ? <AlbumList albums={visibleAlbums} /> : <div className="loading" />}

        {albumsArr.length != visibleAlbums.length && (
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
