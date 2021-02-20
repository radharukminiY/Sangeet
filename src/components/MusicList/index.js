import React, {useContext} from 'react';
import {Context} from '../../contexts/Context';
import playIcon from '../../images/play.svg';
import pauseIcon from '../../images/pause.svg';
import './index.css';

const MusicList = ({tracks, cover}) => {
  const {playingNow, setPlayingNowTo, isPlaying, playPause} = useContext(Context);

  const handlePlay = (track) => {
    if (playingNow?.id === track.id) {
      // Pause playingNow
      playPause();
    } else {
      // Reset to defaults and set new track
      // ** Normally, we should use 'duration' comes from props istead of '30',
      // ** Deezer allows us to play only 30 seconds for each track.
      setPlayingNowTo(track, '00:30', cover);
    }
  };

  const getDuration = (duration) => {
    let minutes = Math.floor(duration / 60).toString();
    let seconds = (duration % 60).toString();
    return `${minutes.length === 1 ? '0' + minutes : minutes}:${seconds.length === 1 ? '0' + seconds : seconds}`;
  };

  return (
    <div id="music-list">
      {tracks.map((track) => {
        return (
          <div key={track.id} className="music-item">
            <img
              onClick={() => handlePlay(track)}
              className="play-pause-btn"
              src={playingNow?.id === track.id && isPlaying ? pauseIcon : playIcon}
              alt="Play-Pause"
            />
            <span className="item-name">{track.title}</span>
            <span className="item-duration">{getDuration(track.duration)}</span>
          </div>
        );
      })}
    </div>
  );
};

export default MusicList;
