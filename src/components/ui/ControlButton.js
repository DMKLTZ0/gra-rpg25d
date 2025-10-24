
import React from 'react';

export const ControlButton = ({ direction, icon: Icon, onButtonPress, onButtonRelease }) => (
  <button
    onMouseDown={() => onButtonPress(direction)}
    onMouseUp={onButtonRelease}
    onMouseLeave={onButtonRelease}
    onTouchStart={(e) => { e.preventDefault(); onButtonPress(direction); }}
    onTouchEnd={(e) => { e.preventDefault(); onButtonRelease(); }}
    style={{
      width: '60px',
      height: '60px',
      background: 'rgba(0, 0, 0, 0.6)',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      touchAction: 'none',
      transition: 'background 0.1s'
    }}
  >
    <Icon size={32} color="#fff" />
  </button>
);
