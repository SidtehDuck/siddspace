import React from 'react';

const DesktopIcon = ({ label, top, left, onClick }) => (
  <div 
    className={`absolute flex flex-col items-center justify-center w-20 h-20 text-white cursor-pointer`}
    style={{ top, left }}
    onClick={onClick}
  >
    <div className="w-12 h-12 mb-1 bg-blue-500 flex items-center justify-center">
      <span className="text-2xl">📁</span>
    </div>
    <span className="text-xs text-center">{label}</span>
  </div>
);

export default DesktopIcon;