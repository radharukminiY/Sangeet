import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {Context} from '../../contexts/Context';
import pauseIcon from '../../images/pause.svg';
import playIcon from '../../images/play.svg';
import './player.css';

const Player = () => {
  const {
    playingNow,
    audioEl,
    progress,
    progressFill,
    isPlaying,
    playPause,
    updateProgress,
    changeCurrentTime,
    handleEnding,
    modifiedDuration,
    modifiedCurrentTime,
  } = useContext(Context);

  if (playingNow) {
    return (
      <div id="player">
        <img className="player-thumbnail" src={playingNow.cover} alt={playingNow.title} />
        <img className="play-pause" onClick={playPause} src={isPlaying ? pauseIcon : playIcon} alt="Play button" />
        <audio onEnded={handleEnding} onTimeUpdate={updateProgress} ref={audioEl} src={playingNow.preview}>
          Your browser does not support the audio tag!
        </audio>
        <span id="current-time">{modifiedCurrentTime}</span>
        <div ref={progress} onClick={changeCurrentTime} className="progress">
          <div ref={progressFill} className="progress-filled"></div>
        </div>
        <span id="duration">{modifiedDuration}</span>
        <span id="playing-name">{playingNow.title}</span>
        <a href={playingNow.link} id="playing-link" target="_blank" rel="noopener noreferrer">
          Open in Deezer
        </a>
        <Link className="playing-artist" to={'/artist/' + playingNow.artist.id}>
          {playingNow.artist.name}
        </Link>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Player;
