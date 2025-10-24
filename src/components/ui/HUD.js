import React from "react";
import { Heart, Zap, Sword, Coins } from "lucide-react";

export const HUD = ({ playerStats, getTotalDefense }) => (
  <div
    style={{
      position: "absolute",
      top: "20px",
      left: "20px",
      background: "rgba(0, 0, 0, 0.8)",
      padding: "15px",
      borderRadius: "12px",
      border: "2px solid rgba(255, 255, 255, 0.2)",
      color: "#fff",
      minWidth: "220px",
      zIndex: 2000,
    }}
  >
    <div
      style={{
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "10px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <Sword size={20} /> Poziom {playerStats.level}
    </div>

    <div style={{ marginBottom: "8px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "4px",
        }}
      >
        <Heart size={16} color="#ef4444" />
        <span style={{ fontSize: "14px" }}>
          HP: {playerStats.hp}/{playerStats.maxHp}
        </span>
      </div>
      <div
        style={{
          width: "100%",
          height: "12px",
          background: "#1f2937",
          borderRadius: "6px",
          overflow: "hidden",
          border: "1px solid #374151",
        }}
      >
        <div
          style={{
            width: `${(playerStats.hp / playerStats.maxHp) * 100}%`,
            height: "100%",
            background: "linear-gradient(90deg, #ef4444, #dc2626)",
            transition: "width 0.3s",
          }}
        />
      </div>
    </div>

    <div style={{ marginBottom: "8px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "4px",
        }}
      >
        <Zap size={16} color="#f59e0b" />
        <span style={{ fontSize: "14px" }}>
          XP: {playerStats.xp}/{playerStats.maxXp}
        </span>
      </div>
      <div
        style={{
          width: "100%",
          height: "12px",
          background: "#1f2937",
          borderRadius: "6px",
          overflow: "hidden",
          border: "1px solid #374151",
        }}
      >
        <div
          style={{
            width: `${(playerStats.xp / playerStats.maxXp) * 100}%`,
            height: "100%",
            background: "linear-gradient(90deg, #f59e0b, #d97706)",
            transition: "width 0.3s",
          }}
        />
      </div>
    </div>

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "14px",
        marginBottom: "8px",
      }}
    >
      <Coins size={16} color="#fbbf24" />
      <span>Złoto: {playerStats.gold}</span>
    </div>

    <div
      style={{
        fontSize: "12px",
        color: "#9ca3af",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        paddingTop: "8px",
      }}
    >
      <div>⚔️ Atak: {playerStats.damage}</div>
      <div>🛡️ Obrona: {getTotalDefense()}</div>
      <div>📏 Zasięg: {playerStats.attackRange}</div>
    </div>
  </div>
);
