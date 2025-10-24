
import React from 'react';

export const Player = ({ displayPos, direction, TILE_SIZE, cameraOffset }) => {
  const rotations = { up: 0, right: 90, down: 180, left: 270 };
  const screenX = (displayPos.x - cameraOffset.x) * TILE_SIZE + TILE_SIZE / 2;
  const screenY = (displayPos.y - cameraOffset.y) * TILE_SIZE + TILE_SIZE / 2;

  return (
    <div style={{
      position: 'absolute',
      left: `${screenX}px`,
      top: `${screenY}px`,
      transform: `translate(-50%, -50%) rotate(${rotations[direction]}deg)`,
      width: '32px',
      height: '32px',
      zIndex: 1000
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '50% 50% 50% 0',
        border: '3px solid #fff',
        boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '6px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '6px',
          height: '6px',
          background: '#fff',
          borderRadius: '50%'
        }} />
      </div>
    </div>
  );
};
