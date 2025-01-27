import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const AudioPlayer = ({ volume, isMuted }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex items-center">
      <button onClick={togglePlay} className="mr-2 text-white">
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
      <audio ref={audioRef} loop>
        <source src="/guile.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;