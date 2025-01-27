import React from 'react';
import Draggable from 'react-draggable';

const Window = ({ id, title, content, onClose, onMinimize, position, zIndex, bringToFront }) => {
  return (
    <Draggable handle=".window-header" onStart={() => bringToFront(id)}>
      <div 
        className="absolute bg-white rounded-lg shadow-lg overflow-hidden"
        style={{ top: position.y, left: position.x, width: '400px', height: '300px', zIndex }}
      >
        <div className="window-header bg-gray-200 px-4 py-2 flex justify-between items-center cursor-move">
          <h3 className="font-bold">{title}</h3>
          <div>
            <button onClick={onMinimize} className="mr-2 px-2 py-1 bg-yellow-500 rounded">_</button>
            <button onClick={onClose} className="px-2 py-1 bg-red-500 rounded">X</button>
          </div>
        </div>
        <div className="p-4 overflow-auto" style={{ height: 'calc(100% - 40px)' }}>
          {content}
        </div>
      </div>
    </Draggable>
  );
};

export default Window;