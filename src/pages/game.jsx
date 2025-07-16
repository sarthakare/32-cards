import React, { useState } from "react";
import "../styles/game.css";
import GameScreen from "../components/GameScreen";

const menuItems = [
  { icon: "🏏", label: "Cricket", count: 15 },
  { icon: "⚽", label: "Football", count: 44 },
  { icon: "🎾", label: "Tennis", count: 17 },
  { icon: "🎰", label: "Casino", count: 1 },
  { icon: "🏆", label: "Sports Book", count: 0 },
  { icon: "🐎", label: "Horse Racing", count: 8 },
  { icon: "🐕", label: "Greyhound Racing", count: 36 },
  { icon: "💹", label: "Binary", count: 1 },
  { icon: "🤼", label: "Kabaddi", count: 0 },
  { icon: "🗳️", label: "Politics", count: 0 },
  { icon: "🏀", label: "Basketball", count: 7 },
];

// ...existing code...


function Game() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="game-container">
      {/* Sidebar for desktop and mobile (drawer) */}
      <div className={`sidebar${sidebarOpen ? " open" : ""}`}>
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <span className="menu-icon">&#9776;</span>
        </button>
        <div className="profile">
          <span style={{ fontWeight: "bold" }}>DEMO-LOGIN</span>
        </div>
        <div className="menu">
          {menuItems.map((item, idx) => (
            <div className="menu-item" key={idx}>
              <span className="icon">{item.icon}</span>
              {item.label}
              <span className="count">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Main Content */}
      <div className="main-content">
        {/* Topbar */}
        <div className="topbar">
          {/* Mobile menu button */}
          <button
            className="menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="menu-icon">&#9776;</span>
          </button>
          <button className="open-bets">OPEN BETS</button>
          <span className="balance">
            0.00 $
            <span role="img" aria-label="user">
              👤
            </span>
          </span>
        </div>
        {/* Center Content */}
        <GameScreen />
      </div>
    </div>
  );
}

export default Game;
