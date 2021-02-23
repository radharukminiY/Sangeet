import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {Context} from '../../contexts/Context';
import playIcon from '../../images/play.svg';
import pauseIcon from '../../images/pause.svg';
import './card.css';

const MusicCard = ({track, duration}) => {
  const {playingNow, setPlayingNowTo, isPlaying, playPause} = useContext(Context);

  const handlePlay = () => {
    if (playingNow?.id === track.id) {
      // Play-Pause playingNow
      playPause();
    } else {
      setPlayingNowTo(track, '00:30');
    }
  };

  return (
    <div className="music-card">
      <div className="music-img" style={{backgroundImage: `url(${track.album.cover})`}} alt={track.title}>
        <div className={playingNow?.id === track.id && isPlaying ? 'img-overlay mouse-entered' : 'img-overlay'}>
          <img
            onClick={handlePlay}
            className="play-button"
            src={playingNow?.id === track.id && isPlaying ? pauseIcon : playIcon}
            alt="Play-Pause"
          />
          <a href={track.link} className="music-open-link" target="_blank" rel="noopener noreferrer">
            Open in Deezer
          </a>
        </div>
      </div>
      <div className="music-meta">
        <span className="music-name">{track.title}</span>
        <span className="music-artist">
          From:{' '}
          <Link className="link" to={'/artist/' + track.artist.id}>
            {track.artist.name}
          </Link>
        </span>
        <span className="music-album">
          In:{' '}
          <Link className="link" to={'/album/' + track.album.id}>
            {track.album.title}
          </Link>
        </span>
        <span className="music-duration">
          Duration: <span>{duration}</span>
        </span>
      </div>
    </div>
  );
};

export default MusicCard;
