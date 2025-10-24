export const mapData = {
  map_base1: {
    width: 200,
    height: 100,
    maxEnemies: 15,
    enemies: [
      { id: 1, x: 105, y: 52, hp: 50, maxHp: 50, type: 'slime', dir: 'down', gold: 10, xp: 30 },
      { id: 2, x: 95, y: 48, hp: 50, maxHp: 50, type: 'slime', dir: 'left', gold: 10, xp: 30 },
      { id: 3, x: 110, y: 55, hp: 80, maxHp: 80, type: 'goblin', dir: 'up', gold: 25, xp: 50 },
      { id: 4, x: 92, y: 55, hp: 80, maxHp: 80, type: 'goblin', dir: 'down', gold: 25, xp: 50 },
      { id: 5, x: 107, y: 45, hp: 50, maxHp: 50, type: 'slime', dir: 'right', gold: 10, xp: 30 }
    ],
    obstacles: [
      { x: 102, y: 50, type: 'rock' }, { x: 103, y: 50, type: 'rock' }, { x: 104, y: 50, type: 'rock' },
      { x: 98, y: 52, type: 'rock' }, { x: 99, y: 52, type: 'rock' },
      { x: 106, y: 48, type: 'rock' }, { x: 107, y: 48, type: 'rock' }, { x: 108, y: 48, type: 'rock' },
      { x: 96, y: 54, type: 'rock' }, { x: 97, y: 55, type: 'rock' },
      { x: 98, y: 48, type: 'water' }, { x: 99, y: 48, type: 'water' }, { x: 100, y: 48, type: 'water' },
      { x: 98, y: 49, type: 'water' }, { x: 99, y: 49, type: 'water' }, { x: 100, y: 49, type: 'water' }
    ],
    items: [
      { id: 'i1', x: 108, y: 52, type: 'potion', name: 'Mikstura zdrowia', healing: 50, icon: '🧪' },
      { id: 'i2', x: 94, y: 51, type: 'gold', amount: 30, icon: '💰' },
      { id: 'i3', x: 112, y: 49, type: 'weapon', name: 'Miecz Żelazny', itemType: 'sword', damage: 15, range: 1, icon: '⚔️', rarity: 'common' },
      { id: 'i4', x: 90, y: 53, type: 'weapon', name: 'Różdżka Ognia', itemType: 'wand', damage: 12, range: 4, icon: '🪄', rarity: 'rare' },
      { id: 'i5', x: 113, y: 47, type: 'armor', name: 'Skórzana Zbroja', itemType: 'armor', defense: 10, icon: '🛡️', slot: 'armor', rarity: 'common' }
    ],
    portals: [
      { x: 115, y: 50, targetMap: 'map_cave1', targetX: 5, targetY: 10, label: 'Jaskinia' }
    ],
    spawnPoints: [
      { x: 105, y: 52 }, { x: 95, y: 48 }, { x: 110, y: 55 }, { x: 92, y: 55 }, { x: 107, y: 45 },
      { x: 88, y: 50 }, { x: 112, y: 52 }, { x: 97, y: 46 }, { x: 103, y: 57 }, { x: 109, y: 48 }
    ]
  },
  map_cave1: {
    width: 150,
    height: 80,
    maxEnemies: 10,
    enemies: [
      { id: 10, x: 20, y: 15, hp: 120, maxHp: 120, type: 'skeleton', dir: 'down', gold: 40, xp: 70 },
      { id: 11, x: 25, y: 20, hp: 120, maxHp: 120, type: 'skeleton', dir: 'left', gold: 40, xp: 70 },
      { id: 12, x: 30, y: 18, hp: 150, maxHp: 150, type: 'orc', dir: 'up', gold: 60, xp: 100 }
    ],
    obstacles: [
      { x: 15, y: 12, type: 'rock' }, { x: 16, y: 12, type: 'rock' }, { x: 17, y: 12, type: 'rock' },
      { x: 15, y: 18, type: 'rock' }, { x: 16, y: 18, type: 'rock' }
    ],
    items: [
      { id: 'i10', x: 30, y: 15, type: 'gold', amount: 100, icon: '💰' },
      { id: 'i11', x: 22, y: 17, type: 'weapon', name: 'Łuk Myśliwski', itemType: 'bow', damage: 18, range: 5, icon: '🏹', rarity: 'rare' },
      { id: 'i12', x: 28, y: 13, type: 'armor', name: 'Hełm Stalowy', itemType: 'helmet', defense: 8, icon: '⛑️', slot: 'helmet', rarity: 'uncommon' }
    ],
    portals: [
      { x: 5, y: 10, targetMap: 'map_base1', targetX: 115, targetY: 50, label: 'Wyjście' }
    ],
    spawnPoints: [
      { x: 20, y: 15 }, { x: 25, y: 20 }, { x: 30, y: 18 }, { x: 18, y: 22 }, { x: 27, y: 14 }
    ]
  }
};
