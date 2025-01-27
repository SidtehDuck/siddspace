import React from 'react';

const StartMenu = ({ isOpen, onClose, windows, openWindow }) => {
  if (!isOpen) return null;
  return (
    <div className="absolute bottom-12 left-0 w-64 bg-gray-800 text-white p-4 rounded-t-lg">
      <h2 className="text-xl mb-2">Start Menu</h2>
      <ul>
        <li className="cursor-pointer hover:bg-gray-700 p-2" onClick={() => openWindow('projects')}>My Projects</li>
        <li className="cursor-pointer hover:bg-gray-700 p-2" onClick={() => openWindow('about')}>About Me</li>
        <li className="cursor-pointer hover:bg-gray-700 p-2">Settings</li>
      </ul>
      {windows.length > 0 && (
        <>
          <h3 className="text-lg mt-4 mb-2">Open Windows</h3>
          <ul>
            {windows.map(window => (
              <li key={window.id} className="cursor-pointer hover:bg-gray-700 p-2" onClick={() => openWindow(window.type)}>
                {window.title}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default StartMenu;