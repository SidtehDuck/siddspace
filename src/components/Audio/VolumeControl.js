import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const VolumeControl = ({ volume, setVolume, isMuted, setIsMuted }) => {
  return (
    <div className="flex items-center">
      <button onClick={() => setIsMuted(!isMuted)} className="mr-2 text-white">
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={isMuted ? 0 : volume} 
        onChange={(e) => setVolume(Number(e.target.value))}
        className="w-24"
      />
    </div>
  );
};

export default VolumeControl;