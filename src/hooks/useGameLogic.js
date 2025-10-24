import { useState, useEffect, useRef, useCallback } from "react";
import { mapData as initialMapData } from "../data/mapData";

const TILE_SIZE = 40;
const VISIBLE_TILES_X = 10;
const VISIBLE_TILES_Y = 20;
const ENEMY_MOVE_INTERVAL = 2000;
const RESPAWN_INTERVAL = 10000;
const PROJECTILE_SPEED = 300;

export const useGameLogic = () => {
  const [currentMap, setCurrentMap] = useState("map_base1");
  const [playerPos, setPlayerPos] = useState({ x: 100, y: 50 });
  const [playerStats, setPlayerStats] = useState({
    hp: 100,
    maxHp: 100,
    level: 1,
    xp: 0,
    maxXp: 100,
    speed: 500,
    gold: 50,
    attackRange: 1,
    damage: 25,
  });
  const [equipment, setEquipment] = useState({
    weapon: null,
    helmet: null,
    armor: null,
    pants: null,
    boots: null,
    shield: null,
  });
  const [inventory, setInventory] = useState([
    {
      id: "potion1",
      name: "Mikstura zdrowia",
      type: "potion",
      healing: 50,
      icon: "🧪",
    },
  ]);
  const [projectiles, setProjectiles] = useState([]);
  const [showInventory, setShowInventory] = useState(false);
  const [cameraOffset, setCameraOffset] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState("down");
  const [isMoving, setIsMoving] = useState(false);
  const [targetPos, setTargetPos] = useState(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [showMessage, setShowMessage] = useState(null);
  const [lastRespawn, setLastRespawn] = useState(Date.now());
  const [mapData, setMapData] = useState(initialMapData);

  const animationFrameRef = useRef(null);
  const lastMoveTimeRef = useRef(0);
  const buttonPressedRef = useRef(null);
  const lastEnemyMoveRef = useRef(Date.now());
  const nextEnemyIdRef = useRef(100);

  const currentMapData = mapData[currentMap];
  const MAP_WIDTH = currentMapData.width;
  const MAP_HEIGHT = currentMapData.height;

  const getWeaponType = useCallback(() => {
    if (!equipment.weapon) return "melee";
    const type = equipment.weapon.itemType;
    if (type === "bow") return "archer";
    if (type === "wand") return "mage";
    return "melee";
  }, [equipment.weapon]);

  const getTotalDefense = useCallback(() => {
    return Object.values(equipment).reduce(
      (acc, item) => acc + (item?.defense || 0),
      0,
    );
  }, [equipment]);

  const isObstacle = useCallback(
    (x, y) => {
      return currentMapData.obstacles.some((obs) => obs.x === x && obs.y === y);
    },
    [currentMapData.obstacles],
  );

  const getEnemyAt = useCallback(
    (x, y) => {
      return currentMapData.enemies.find(
        (enemy) => enemy.x === x && enemy.y === y,
      );
    },
    [currentMapData.enemies],
  );

  const canMove = useCallback(
    (x, y) => {
      return (
        x >= 0 && x < MAP_WIDTH && y >= 0 && y < MAP_HEIGHT && !isObstacle(x, y)
      );
    },
    [MAP_WIDTH, MAP_HEIGHT, isObstacle],
  );

  const displayMessage = useCallback((msg) => {
    setShowMessage(msg);
    setTimeout(() => setShowMessage(null), 2000);
  }, []);

  const attackEnemy = useCallback(
    (x, y) => {
      setMapData((prev) => {
        const newEnemies = prev[currentMap].enemies
          .map((enemy) => {
            if (enemy.x === x && enemy.y === y) {
              const damage = playerStats.damage;
              const newHp = enemy.hp - damage;
              if (newHp <= 0) {
                setPlayerStats((ps) => ({
                  ...ps,
                  xp: ps.xp + enemy.xp,
                  gold: ps.gold + enemy.gold,
                }));
                displayMessage(`+${enemy.gold} złota!`);
                return null;
              }
              return { ...enemy, hp: newHp };
            }
            return enemy;
          })
          .filter(Boolean);

        return {
          ...prev,
          [currentMap]: {
            ...prev[currentMap],
            enemies: newEnemies,
          },
        };
      });
    },
    [currentMap, playerStats.damage, displayMessage],
  );

  const createProjectile = useCallback(
    (targetX, targetY) => {
      const newProjectile = {
        id: Date.now(),
        startX: playerPos.x,
        startY: playerPos.y,
        targetX,
        targetY,
        currentX: playerPos.x,
        currentY: playerPos.y,
        startTime: Date.now(),
        weaponType: getWeaponType(),
      };
      setProjectiles((prev) => [...prev, newProjectile]);
    },
    [playerPos, getWeaponType],
  );

  const performAttack = useCallback(() => {
    const weaponType = getWeaponType();
    const range = playerStats.attackRange;

    if (weaponType === "melee") {
      let targetX = playerPos.x;
      let targetY = playerPos.y;

      switch (direction) {
        case "up":
          targetY--;
          break;
        case "down":
          targetY++;
          break;
        case "left":
          targetX--;
          break;
        case "right":
          targetX++;
          break;
        default:
          break;
      }

      if (getEnemyAt(targetX, targetY)) {
        attackEnemy(targetX, targetY);
      }
    } else {
      const enemies = currentMapData.enemies;
      let closestEnemy = null;
      let minDistance = Infinity;

      enemies.forEach((enemy) => {
        const dx = enemy.x - playerPos.x;
        const dy = enemy.y - playerPos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= range && distance < minDistance) {
          minDistance = distance;
          closestEnemy = enemy;
        }
      });

      if (closestEnemy) {
        createProjectile(closestEnemy.x, closestEnemy.y);
      }
    }
  }, [
    getWeaponType,
    playerStats.attackRange,
    playerPos,
    direction,
    currentMapData.enemies,
    getEnemyAt,
    attackEnemy,
    createProjectile,
  ]);

  const usePortal = useCallback(
    (x, y) => {
      const portal = currentMapData.portals.find((p) => p.x === x && p.y === y);
      if (!portal) return;

      displayMessage(`Przejście do: ${portal.label}`);
      setCurrentMap(portal.targetMap);
      setPlayerPos({ x: portal.targetX, y: portal.targetY });
    },
    [currentMapData.portals, displayMessage],
  );

  const pickupItem = useCallback(
    (x, y) => {
      const item = currentMapData.items.find((i) => i.x === x && i.y === y);
      if (!item) return;

      if (item.type === "gold") {
        setPlayerStats((prev) => ({ ...prev, gold: prev.gold + item.amount }));
        displayMessage(`+${item.amount} złota!`);
      } else {
        setInventory((prev) => [
          ...prev,
          { ...item, id: `${item.type}_${Date.now()}` },
        ]);
        displayMessage(`Podniesiono: ${item.name}`);
      }

      setMapData((prev) => ({
        ...prev,
        [currentMap]: {
          ...prev[currentMap],
          items: prev[currentMap].items.filter((i) => i.id !== item.id),
        },
      }));
    },
    [currentMapData.items, currentMap, displayMessage],
  );

  const initiateMove = useCallback(
    (dir) => {
      if (isMoving) return;

      let newX = playerPos.x;
      let newY = playerPos.y;

      switch (dir) {
        case "up":
          newY--;
          break;
        case "down":
          newY++;
          break;
        case "left":
          newX--;
          break;
        case "right":
          newX++;
          break;
        default:
          return;
      }

      if (currentMapData.portals.some((p) => p.x === newX && p.y === newY)) {
        usePortal(newX, newY);
        return;
      }

      if (currentMapData.items.some((i) => i.x === newX && i.y === newY)) {
        pickupItem(newX, newY);
      }

      if (!canMove(newX, newY) || getEnemyAt(newX, newY)) return;

      setDirection(dir);
      setTargetPos({ x: newX, y: newY });
      setIsMoving(true);
      setAnimationProgress(0);
      lastMoveTimeRef.current = Date.now();
    },
    [
      isMoving,
      playerPos,
      canMove,
      getEnemyAt,
      usePortal,
      pickupItem,
      currentMapData.portals,
      currentMapData.items,
    ],
  );

  const equipItem = useCallback(
    (itemId) => {
      const item = inventory.find((i) => i.id === itemId);
      if (!item || (item.type !== "weapon" && item.type !== "armor")) return;

      const unequip = (slot) => {
        if (equipment[slot]) {
          setInventory((prev) => [...prev, equipment[slot]]);
        }
      };

      if (item.type === "weapon") {
        unequip("weapon");
        setEquipment((prev) => ({ ...prev, weapon: item }));
        setPlayerStats((prev) => ({
          ...prev,
          attackRange: item.range,
          damage: 25 + item.damage,
        }));
      } else if (item.type === "armor") {
        const slot = item.slot;
        unequip(slot);
        setEquipment((prev) => ({ ...prev, [slot]: item }));
      }

      setInventory((prev) => prev.filter((i) => i.id !== itemId));
      displayMessage(`Założono: ${item.name}`);
    },
    [inventory, equipment, displayMessage],
  );

  const useItem = useCallback(
    (itemId) => {
      const item = inventory.find((i) => i.id === itemId);
      if (!item) return;

      if (item.type === "potion") {
        setPlayerStats((prev) => ({
          ...prev,
          hp: Math.min(prev.maxHp, prev.hp + item.healing),
        }));
        setInventory((prev) => prev.filter((i) => i.id !== itemId));
        displayMessage(`Użyto: ${item.name} (+${item.healing} HP)`);
      } else if (item.type === "weapon" || item.type === "armor") {
        equipItem(itemId);
      }
    },
    [inventory, equipItem, displayMessage],
  );

  const handleButtonPress = useCallback(
    (dir) => {
      buttonPressedRef.current = dir;
      if (!isMoving) {
        initiateMove(dir);
      }
    },
    [isMoving, initiateMove],
  );

  const handleButtonRelease = useCallback(() => {
    buttonPressedRef.current = null;
  }, []);

  const resetGame = useCallback(() => {
    setPlayerStats({
      hp: 100,
      maxHp: 100,
      level: 1,
      xp: 0,
      maxXp: 100,
      speed: 500,
      gold: 50,
      attackRange: 1,
      damage: 25,
    });
    setPlayerPos({ x: 100, y: 50 });
    setCurrentMap("map_base1");
    setInventory([
      {
        id: "potion1",
        name: "Mikstura zdrowia",
        type: "potion",
        healing: 50,
        icon: "🧪",
      },
    ]);
    setEquipment({
      weapon: null,
      helmet: null,
      armor: null,
      pants: null,
      boots: null,
      shield: null,
    });
    setMapData(initialMapData);
  }, []);

  useEffect(() => {
    if (playerStats.hp <= 0) {
      // Game over logic handled in component
    }
  }, [playerStats.hp]);

  useEffect(() => {
    const updateProjectiles = () => {
      const now = Date.now();
      setProjectiles((prev) =>
        prev
          .map((proj) => {
            const elapsed = now - proj.startTime;
            const progress = Math.min(elapsed / PROJECTILE_SPEED, 1);

            if (progress >= 1) {
              if (getEnemyAt(proj.targetX, proj.targetY)) {
                attackEnemy(proj.targetX, proj.targetY);
              }
              return null;
            }

            return {
              ...proj,
              currentX: proj.startX + (proj.targetX - proj.startX) * progress,
              currentY: proj.startY + (proj.targetY - proj.startY) * progress,
            };
          })
          .filter(Boolean),
      );
    };
    const interval = setInterval(updateProjectiles, 16);
    return () => clearInterval(interval);
  }, [attackEnemy, getEnemyAt]);

  useEffect(() => {
    const moveEnemies = () => {
      const now = Date.now();
      if (now - lastEnemyMoveRef.current < ENEMY_MOVE_INTERVAL) return;
      lastEnemyMoveRef.current = now;

      setMapData((prev) => {
        const newEnemies = prev[currentMap].enemies.map((enemy) => {
          const dx = playerPos.x - enemy.x;
          const dy = playerPos.y - enemy.y;
          const distance = Math.abs(dx) + Math.abs(dy);

          if (distance === 1) {
            const baseDamage =
              { slime: 10, goblin: 15, skeleton: 20, orc: 25 }[enemy.type] ||
              10;
            const actualDamage = Math.max(1, baseDamage - getTotalDefense());
            setPlayerStats((ps) => ({
              ...ps,
              hp: Math.max(0, ps.hp - actualDamage),
            }));
            return enemy;
          }

          if (distance > 1 && distance <= 10) {
            let newX = enemy.x,
              newY = enemy.y,
              newDir = enemy.dir;
            if (Math.abs(dx) > Math.abs(dy)) {
              newDir = dx > 0 ? "right" : "left";
              newX += dx > 0 ? 1 : -1;
            } else {
              newDir = dy > 0 ? "down" : "up";
              newY += dy > 0 ? 1 : -1;
            }
            if (
              canMove(newX, newY) &&
              !getEnemyAt(newX, newY) &&
              (newX !== playerPos.x || newY !== playerPos.y)
            ) {
              return { ...enemy, x: newX, y: newY, dir: newDir };
            }
          }

          // Random move
          const dirs = ["up", "down", "left", "right"];
          const randomDir = dirs[Math.floor(Math.random() * 4)];
          let newX = enemy.x,
            newY = enemy.y;
          switch (randomDir) {
            case "up":
              newY--;
              break;
            case "down":
              newY++;
              break;
            case "left":
              newX--;
              break;
            case "right":
              newX++;
              break;
            default:
              break;
          }
          if (
            canMove(newX, newY) &&
            !getEnemyAt(newX, newY) &&
            (newX !== playerPos.x || newY !== playerPos.y)
          ) {
            return { ...enemy, x: newX, y: newY, dir: randomDir };
          }

          return enemy;
        });
        return {
          ...prev,
          [currentMap]: { ...prev[currentMap], enemies: newEnemies },
        };
      });
    };

    const spawnEnemy = () => {
      const now = Date.now();
      if (now - lastRespawn < RESPAWN_INTERVAL) return;
      if (currentMapData.enemies.length >= currentMapData.maxEnemies) return;

      const availableSpawns = currentMapData.spawnPoints.filter(
        (p) =>
          Math.abs(p.x - playerPos.x) > 15 || Math.abs(p.y - playerPos.y) > 15,
      );
      if (availableSpawns.length === 0) return;

      const spawnPoint =
        availableSpawns[Math.floor(Math.random() * availableSpawns.length)];
      const enemyTemplates = {
        map_base1: [
          { type: "slime", hp: 50, gold: 10, xp: 30 },
          { type: "goblin", hp: 80, gold: 25, xp: 50 },
        ],
        map_cave1: [
          { type: "skeleton", hp: 120, gold: 40, xp: 70 },
          { type: "orc", hp: 150, gold: 60, xp: 100 },
        ],
      };
      const template =
        enemyTemplates[currentMap][
          Math.floor(Math.random() * enemyTemplates[currentMap].length)
        ];

      const newEnemy = {
        id: nextEnemyIdRef.current++,
        x: spawnPoint.x,
        y: spawnPoint.y,
        hp: template.hp,
        maxHp: template.hp,
        type: template.type,
        dir: ["up", "down", "left", "right"][Math.floor(Math.random() * 4)],
        gold: template.gold,
        xp: template.xp,
      };

      setMapData((prev) => ({
        ...prev,
        [currentMap]: {
          ...prev[currentMap],
          enemies: [...prev[currentMap].enemies, newEnemy],
        },
      }));
      setLastRespawn(now);
    };

    const interval = setInterval(() => {
      moveEnemies();
      spawnEnemy();
    }, 500);
    return () => clearInterval(interval);
  }, [
    playerPos,
    currentMap,
    currentMapData,
    canMove,
    getEnemyAt,
    getTotalDefense,
    lastRespawn,
  ]);

  useEffect(() => {
    if (playerStats.xp >= playerStats.maxXp) {
      setPlayerStats((prev) => ({
        ...prev,
        level: prev.level + 1,
        xp: prev.xp - prev.maxXp,
        maxXp: Math.floor(prev.maxXp * 1.5),
        maxHp: prev.maxHp + 20,
        hp: prev.maxHp + 20,
      }));
      displayMessage("POZIOM WYŻEJ!");
    }
  }, [playerStats.xp, playerStats.maxXp, displayMessage]);

  useEffect(() => {
    if (!isMoving || !targetPos) return;

    const animate = () => {
      const elapsed = Date.now() - lastMoveTimeRef.current;
      const progress = Math.min(elapsed / playerStats.speed, 1);
      setAnimationProgress(progress);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setPlayerPos(targetPos);
        setIsMoving(false);
        setAnimationProgress(0);

        if (buttonPressedRef.current) {
          setTimeout(() => initiateMove(buttonPressedRef.current), 10);
        }
      }
    };
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [isMoving, targetPos, playerStats.speed, initiateMove]);

  useEffect(() => {
    const offsetX = Math.max(
      0,
      Math.min(playerPos.x - VISIBLE_TILES_X / 2, MAP_WIDTH - VISIBLE_TILES_X),
    );
    const offsetY = Math.max(
      0,
      Math.min(playerPos.y - VISIBLE_TILES_Y / 2, MAP_HEIGHT - VISIBLE_TILES_Y),
    );
    setCameraOffset({ x: offsetX, y: offsetY });
  }, [playerPos, MAP_WIDTH, MAP_HEIGHT]);

  const getCurrentDisplayPosition = () => {
    if (!isMoving || !targetPos) return playerPos;
    const easeProgress = 1 - Math.pow(1 - animationProgress, 3); // easeOutCubic
    return {
      x: playerPos.x + (targetPos.x - playerPos.x) * easeProgress,
      y: playerPos.y + (targetPos.y - playerPos.y) * easeProgress,
    };
  };

  return {
    playerPos,
    playerStats,
    equipment,
    inventory,
    projectiles,
    showInventory,
    cameraOffset,
    direction,
    isMoving,
    targetPos,
    animationProgress,
    showMessage,
    currentMap,
    currentMapData,
    TILE_SIZE,
    VISIBLE_TILES_X,
    VISIBLE_TILES_Y,
    setShowInventory,
    performAttack,
    useItem,
    handleButtonPress,
    handleButtonRelease,
    resetGame,
    getCurrentDisplayPosition,
    getTotalDefense,
    getWeaponType,
  };
};
