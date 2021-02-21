export const initialState = {
  albumData: null,
  visibleMusics: [],
};

const albumReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALBUM_DATA':
      return {albumData: action.data, visibleMusics: [...action.data.tracks.data.slice(0, 20)]};
    case 'SET_VISIBLE_MUSICS':
      return {...state, visibleMusics: action.data};
    default:
      return state;
  }
};

export default albumReducer;
