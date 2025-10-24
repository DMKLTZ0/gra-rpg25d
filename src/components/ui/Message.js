
import React from 'react';

export const Message = ({ message }) => {
  if (!message) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(0, 0, 0, 0.9)',
      border: '3px solid #fbbf24',
      borderRadius: '16px',
      padding: '20px 40px',
      color: '#fff',
      fontSize: '20px',
      fontWeight: 'bold',
      zIndex: 4000,
      textAlign: 'center',
      boxShadow: '0 10px 40px rgba(0,0,0,0.8)'
    }}>
      {message}
    </div>
  );
};
