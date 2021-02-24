import React, {createContext, useRef, useState} from 'react';

export const Context = createContext();

const ContextProvider = ({children}) => {
  const [playingNow, setPlayingNow] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modifiedDuration, setModifiedDuration] = useState('00:00');
  const [modifiedCurrentTime, setModifiedCurrentTime] = useState('00:00');

  // References
  const audioEl = useRef(null);
  const progress = useRef(null);
  const progressFill = useRef(null);

  const setPlayingNowTo = async (obj, dur, cover) => {
    if (playingNow) {
      // Pause current track
      audioEl.current.pause();
      await setIsPlaying(false);

      // Reset progressFill width
      progressFill.current.style.width = '0%';
    }

    // Set new track
    await setPlayingNow({
      ...obj,
      cover: cover || obj.album.cover,
    });
    await setModifiedDuration(dur);

    // Play new track
    audioEl.current.play();
    await setIsPlaying(true);
  };

  const playPause = () => {
    if (audioEl.current.paused) {
      audioEl.current.play();
      setIsPlaying(true);
    } else {
      audioEl.current.pause();
      setIsPlaying(false);
    }
  };

  const updateProgress = () => {
    // Update progress fill
    const {currentTime, duration} = audioEl.current;
    const percent = (currentTime / duration) * 100;
    progressFill.current.style.width = `${percent}%`;

    // Update modifiedCurrentTime
    modifyCurrentTime(currentTime);
  };

  const modifyCurrentTime = (cTime) => {
    const time = cTime || audioEl.current.currentTime;

    let minutes = Math.floor(time / 60).toString();
    minutes.length === 0 && (minutes = '00');
    minutes.length === 1 && (minutes = '0' + minutes);

    let seconds = Math.floor(time % 60).toString();
    seconds.length === 0 && (seconds = '00');
    seconds.length === 1 && (seconds = '0' + seconds);

    setModifiedCurrentTime(`${minutes}:${seconds}`);
  };

  const changeCurrentTime = (e) => {
    const newTime = (e.nativeEvent.offsetX / progress.current.offsetWidth) * audioEl.current.duration;
    audioEl.current.currentTime = newTime;
  };

  const handleEnding = () => {
    setIsPlaying(false);
    progressFill.current.style.width = '0%';
    setModifiedCurrentTime('00:00');
  };

  return (
    <Context.Provider
      value={{
        playingNow,
        setPlayingNowTo,
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
      }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
