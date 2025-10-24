
import React from 'react';

const enemyColors = {
  slime: { main: '#22c55e', dark: '#16a34a', border: '#15803d' },
  goblin: { main: '#ef4444', dark: '#dc2626', border: '#991b1b' },
  skeleton: { main: '#d1d5db', dark: '#9ca3af', border: '#6b7280' },
  orc: { main: '#84cc16', dark: '#65a30d', border: '#4d7c0f' }
};

export const Enemy = ({ enemy, TILE_SIZE, cameraOffset, VISIBLE_TILES_X, VISIBLE_TILES_Y }) => {
  const rotations = { up: 0, right: 90, down: 180, left: 270 };
  const screenX = (enemy.x - cameraOffset.x) * TILE_SIZE + TILE_SIZE / 2;
  const screenY = (enemy.y - cameraOffset.y) * TILE_SIZE + TILE_SIZE / 2;
  
  if (screenX < -50 || screenX > VISIBLE_TILES_X * TILE_SIZE + 50 ||
      screenY < -50 || screenY > VISIBLE_TILES_Y * TILE_SIZE + 50) {
    return null;
  }

  const colors = enemyColors[enemy.type] || enemyColors.slime;
  
  return (
    <div style={{ position: 'absolute', left: `${screenX}px`, top: `${screenY}px`, transform: 'translate(-50%, -50%)', zIndex: 900 }}>
      <div style={{
        width: '32px',
        height: '32px',
        transform: `rotate(${rotations[enemy.dir]}deg)`,
        position: 'relative'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, ${colors.main} 0%, ${colors.dark} 100%)`,
          borderRadius: '50% 50% 50% 0',
          border: `2px solid ${colors.border}`,
          boxShadow: '0 3px 6px rgba(0,0,0,0.4)'
        }}>
          <div style={{
            position: 'absolute',
            top: '6px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '5px',
            height: '5px',
            background: '#dc2626',
            borderRadius: '50%'
          }} />
        </div>
      </div>
      <div style={{
        position: 'absolute',
        top: '-12px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '36px',
        height: '6px',
        background: '#1f2937',
        borderRadius: '3px',
        overflow: 'hidden',
        border: '1px solid #000'
      }}>
        <div style={{ width: `${(enemy.hp / enemy.maxHp) * 100}%`, height: '100%', background: `linear-gradient(90deg, ${colors.main}, ${colors.dark})`, transition: 'width 0.3s' }} />
      </div>
    </div>
  );
};
