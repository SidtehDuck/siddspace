import React, { useState } from 'react';
import ThreeScene from '../ThreeScene/ThreeScene';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import StartMenu from './StartMenu';
import AudioPlayer from '../Audio/AudioPlayer';
import VolumeControl from '../Audio/VolumeControl';

const Desktop = () => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [windows, setWindows] = useState([]);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [windowZIndex, setWindowZIndex] = useState(1);

  const openWindow = (type) => {
    const existingWindow = windows.find(w => w.type === type);
    if (existingWindow) {
      bringToFront(existingWindow.id);
      return;
    }

    const newWindow = {
      id: Date.now(),
      type,
      title: type === 'projects' ? 'My Projects' : 'About Me',
      position: { x: Math.random() * 100, y: Math.random() * 100 },
      content: type === 'projects' 
        ? <p>Projects here...</p>
        : <p>Rant about myself here...</p>,
      zIndex: windowZIndex
    };
    setWindows([...windows, newWindow]);
    setWindowZIndex(prev => prev + 1);
  };

  const closeWindow = (id) => {
    setWindows(windows.filter(window => window.id !== id));
    setMinimizedWindows(minimizedWindows.filter(window => window.id !== id));
  };

  const minimizeWindow = (window) => {
    setWindows(windows.filter(w => w.id !== window.id));
    setMinimizedWindows([...minimizedWindows, window]);
  };

  const restoreWindow = (window) => {
    setMinimizedWindows(minimizedWindows.filter(w => w.id !== window.id));
    setWindows([...windows, {...window, zIndex: windowZIndex}]);
    setWindowZIndex(prev => prev + 1);
  };

  const bringToFront = (id) => {
    setWindows(windows.map(window => 
      window.id === id ? {...window, zIndex: windowZIndex} : window
    ));
    setWindowZIndex(prev => prev + 1);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: "#002135" }}>
      <ThreeScene />
      
      <DesktopIcon 
        label="My Projects" 
        top="20px"
        left="20px"
        onClick={() => openWindow('projects')}
      />
      <DesktopIcon 
        label="About Me" 
        top="120px"
        left="20px"
        onClick={() => openWindow('about')}
      />

      {windows.map(window => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          content={window.content}
          position={window.position}
          zIndex={window.zIndex}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window)}
          bringToFront={bringToFront}
        />
      ))}

      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-800 flex items-center justify-between px-4">
        <div className="flex items-center">
          <button 
            onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
          >
            Start
          </button>
          <AudioPlayer volume={volume} isMuted={isMuted} />
          {minimizedWindows.map(window => (
            <button
              key={window.id}
              onClick={() => restoreWindow(window)}
              className="bg-gray-600 text-white px-2 py-1 rounded mr-2"
            >
              {window.title}
            </button>
          ))}
        </div>
        <VolumeControl 
          volume={volume} 
          setVolume={setVolume} 
          isMuted={isMuted} 
          setIsMuted={setIsMuted} 
        />
      </div>

      <StartMenu 
        isOpen={isStartMenuOpen} 
        onClose={() => setIsStartMenuOpen(false)}
        windows={[...windows, ...minimizedWindows]}
        openWindow={openWindow}
      />
    </div>
  );
};

export default Desktop;