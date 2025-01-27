import React from 'react';
import useThreeScene from '../../hooks/useThreeScene';

const ThreeScene = () => {
  const { mountRef } = useThreeScene();

  return <div ref={mountRef} className="absolute inset-0" />;
};

export default ThreeScene;