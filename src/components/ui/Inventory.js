import React from "react";
import { X, ShoppingBag } from "lucide-react";

const getRarityColor = (rarity) => {
  switch (rarity) {
    case "common":
      return "#9ca3af";
    case "uncommon":
      return "#22c55e";
    case "rare":
      return "#3b82f6";
    case "epic":
      return "#a855f7";
    case "legendary":
      return "#f59e0b";
    default:
      return "#9ca3af";
  }
};

export const Inventory = ({ show, onClose, inventory, equipment, useItem }) => {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(0, 0, 0, 0.95)",
        border: "3px solid rgba(255, 255, 255, 0.3)",
        borderRadius: "16px",
        padding: "24px",
        minWidth: "320px",
        maxWidth: "400px",
        maxHeight: "80vh",
        overflow: "auto",
        zIndex: 3000,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          color: "#fff",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "24px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <ShoppingBag size={24} />
          Ekwipunek
        </h2>
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            padding: "4px",
          }}
        >
          <X size={24} />
        </button>
      </div>

      <div
        style={{
          marginBottom: "20px",
          paddingBottom: "16px",
          borderBottom: "2px solid rgba(255,255,255,0.2)",
        }}
      >
        <h3 style={{ color: "#fff", fontSize: "16px", marginBottom: "12px" }}>
          Założony Ekwipunek
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "8px",
            fontSize: "12px",
          }}
        >
          {Object.entries(equipment).map(([slot, item]) => (
            <div
              key={slot}
              style={{
                background: "rgba(255,255,255,0.1)",
                padding: "8px",
                borderRadius: "8px",
                textAlign: "center",
                color: "#fff",
              }}
            >
              <div style={{ marginBottom: "4px" }}>
                {slot.charAt(0).toUpperCase() + slot.slice(1)}
              </div>
              <div style={{ fontSize: "20px" }}>{item ? item.icon : "❌"}</div>
            </div>
          ))}
        </div>
      </div>

      {inventory.length === 0 ? (
        <div style={{ color: "#9ca3af", textAlign: "center", padding: "20px" }}>
          Ekwipunek jest pusty
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {inventory.map((item) => (
            <div
              key={item.id}
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: `2px solid ${item.rarity ? getRarityColor(item.rarity) : "rgba(255, 255, 255, 0.2)"}`,
                borderRadius: "12px",
                padding: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#fff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flex: 1,
                }}
              >
                <span style={{ fontSize: "32px" }}>{item.icon}</span>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontWeight: "bold",
                      color: item.rarity ? getRarityColor(item.rarity) : "#fff",
                    }}
                  >
                    {item.name}
                  </div>
                  <div style={{ fontSize: "11px", color: "#9ca3af" }}>
                    {item.type === "potion" && `Leczy: ${item.healing} HP`}
                    {item.type === "weapon" &&
                      `⚔️ ${item.damage} | 📏 ${item.range}`}
                    {item.type === "armor" && `🛡️ Obrona: ${item.defense}`}
                  </div>
                </div>
              </div>
              <button
                onClick={() => useItem(item.id)}
                style={{
                  background:
                    item.type === "potion"
                      ? "linear-gradient(135deg, #22c55e, #16a34a)"
                      : "linear-gradient(135deg, #3b82f6, #2563eb)",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                {item.type === "potion" ? "Użyj" : "Załóż"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
