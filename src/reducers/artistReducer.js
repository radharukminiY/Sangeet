export const initialState = {
  artistData: null,
  musicsArr: [],
  albumsArr: [],
  visibleMusics: [],
  visibleAlbums: [],
};

const artistReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ARTIST_DATA':
      return {...state, artistData: action.data};
    case 'SET_TRACKS':
      return {...state, musicsArr: action.data, visibleMusics: [...action.data.slice(0, 10)]};
    case 'SET_ALBUMS':
      return {...state, albumsArr: action.data, visibleAlbums: [...action.data.slice(0, 8)]};
    case 'SET_VISIBLE_MUSICS':
      return {...state, visibleMusics: action.data};
    case 'SET_VISIBLE_ALBUMS':
      return {...state, visibleAlbums: action.data};
    default:
      return state;
  }
};

export default artistReducer;
