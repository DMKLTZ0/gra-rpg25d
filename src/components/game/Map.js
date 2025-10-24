
import React from 'react';

const getTerrainColor = (x, y, obstacle, currentMap) => {
  if (obstacle?.type === 'water') return '#1e40af';
  if (obstacle?.type === 'rock') return '#654321';
  
  const isEven = (y % 2 === 0) ? (x % 2 === 0) : (x % 2 !== 0);
  return currentMap === 'map_cave1' 
    ? (isEven ? '#374151' : '#4b5563')
    : (isEven ? '#2d5016' : '#3a6b1f');
};

const Tile = React.memo(({ x, y, TILE_SIZE, cameraOffset, currentMap, currentMapData }) => {
    const obstacle = currentMapData.obstacles.find(obs => obs.x === x && obs.y === y);
    const item = currentMapData.items.find(it => it.x === x && it.y === y);
    const portal = currentMapData.portals.find(p => p.x === x && p.y === y);

    return (
        <div
            style={{
                position: 'absolute',
                left: `${(x - cameraOffset.x) * TILE_SIZE}px`,
                top: `${(y - cameraOffset.y) * TILE_SIZE}px`,
                width: `${TILE_SIZE}px`,
                height: `${TILE_SIZE}px`,
                background: getTerrainColor(x, y, obstacle, currentMap),
                border: '1px solid rgba(0,0,0,0.1)',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {obstacle?.type === 'rock' && <div style={{ width: '80%', height: '80%', background: 'radial-gradient(circle, #8b7355 30%, #654321 70%)', borderRadius: '30%', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)' }} />}
            {obstacle?.type === 'water' && <div style={{ width: '100%', height: '100%', background: 'radial-gradient(circle, #3b82f6 20%, #1e40af 80%)', opacity: 0.8 }} />}
            {item && <div style={{ fontSize: '24px', animation: 'bounce 1s infinite', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{item.icon}</div>}
            {portal && <div style={{ width: '90%', height: '90%', background: 'radial-gradient(circle, #8b5cf6 0%, #6d28d9 100%)', borderRadius: '50%', boxShadow: '0 0 20px #8b5cf6', animation: 'pulse 2s infinite' }} />}
        </div>
    );
});

export const Map = ({ currentMap, currentMapData, TILE_SIZE, cameraOffset, VISIBLE_TILES_X, VISIBLE_TILES_Y }) => {
  const tiles = [];
  const startX = Math.floor(cameraOffset.x);
  const startY = Math.floor(cameraOffset.y);
  const endX = Math.min(startX + VISIBLE_TILES_X + 2, currentMapData.width);
  const endY = Math.min(startY + VISIBLE_TILES_Y + 2, currentMapData.height);

  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
        tiles.push(<Tile key={`${x}-${y}`} x={x} y={y} TILE_SIZE={TILE_SIZE} cameraOffset={cameraOffset} currentMap={currentMap} currentMapData={currentMapData} />);
    }
  }
  return <>{tiles}</>;
};
