
import React from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Target, Package } from 'lucide-react';
import { useGameLogic } from './hooks/useGameLogic';
import { Map } from './components/game/Map';
import { Player } from './components/game/Player';
import { Enemy } from './components/game/Enemy';
import { ControlButton } from './components/ui/ControlButton';
import { HUD } from './components/ui/HUD';
import { Inventory } from './components/ui/Inventory';
import { Message } from './components/ui/Message';
import './styles/main.css';

const MobileRPG = () => {
  const game = useGameLogic();

  if (game.playerStats.hp <= 0) {
    return (
      <div className="game-over-screen">
        <div>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>💀</div>
          <h2 style={{ fontSize: '32px', marginBottom: '16px', color: '#ef4444' }}>Zginąłeś!</h2>
          <p style={{ fontSize: '18px', marginBottom: '24px' }}>Poziom: {game.playerStats.level} | Zdobyte złoto: {game.playerStats.gold}</p>
          <button onClick={game.resetGame} className="restart-button">
            Zacznij od nowa
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <HUD playerStats={game.playerStats} getTotalDefense={game.getTotalDefense} />
      <button onClick={() => game.setShowInventory(true)} className="inventory-button">
        <Package size={20} /> Ekwipunek ({game.inventory.length})
      </button>
      <Inventory 
        show={game.showInventory} 
        onClose={() => game.setShowInventory(false)} 
        inventory={game.inventory} 
        equipment={game.equipment}
        useItem={game.useItem} 
      />
      <Message message={game.showMessage} />

      <div className="map-viewport">
          <Map {...game} />
          {game.currentMapData.enemies.map(enemy => <Enemy key={enemy.id} enemy={enemy} {...game} />)}
          {/* Projectiles would be rendered here */}
          <Player displayPos={game.getCurrentDisplayPosition()} direction={game.direction} {...game} />
      </div>

      <div className="controls-dpad">
          <div style={{ gridColumn: '2', gridRow: '1' }}><ControlButton direction="up" icon={ChevronUp} onButtonPress={game.handleButtonPress} onButtonRelease={game.handleButtonRelease} /></div>
          <div style={{ gridColumn: '1', gridRow: '2' }}><ControlButton direction="left" icon={ChevronLeft} onButtonPress={game.handleButtonPress} onButtonRelease={game.handleButtonRelease} /></div>
          <div style={{ gridColumn: '3', gridRow: '2' }}><ControlButton direction="right" icon={ChevronRight} onButtonPress={game.handleButtonPress} onButtonRelease={game.handleButtonRelease} /></div>
          <div style={{ gridColumn: '2', gridRow: '3' }}><ControlButton direction="down" icon={ChevronDown} onButtonPress={game.handleButtonPress} onButtonRelease={game.handleButtonRelease} /></div>
      </div>

      <button onClick={game.performAttack} onTouchStart={(e) => { e.preventDefault(); game.performAttack(); }} className="attack-button">
          <Target size={40} color="#fff" />
      </button>
    </div>
  );
};

export default MobileRPG;
