import React, { useState, useEffect } from "react";
import "../style/game.css";
import GameScreen from "../components/GameScreen";

const menuItems = [
  // { icon: "🏏", label: "Cricket", count: 15 },
  // { icon: "⚽", label: "Football", count: 44 },
  // { icon: "🎾", label: "Tennis", count: 17 },
  // { icon: "🎰", label: "Casino", count: 1 },
  // { icon: "🏆", label: "Sports Book", count: 0 },
  // { icon: "🐎", label: "Horse Racing", count: 8 },
  // { icon: "🐕", label: "Greyhound Racing", count: 36 },
  // { icon: "💹", label: "Binary", count: 1 },
  // { icon: "🤼", label: "Kabaddi", count: 0 },
  // { icon: "🗳️", label: "Politics", count: 0 },
  // { icon: "🏀", label: "Basketball", count: 7 },
];

// ...existing code...

function Game() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [timer, setTimer] = useState(30);
  const [stage, setStage] = useState(0); // 0: welcome, 1: idle, 2: clapping
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 900;

  useEffect(() => {
    let interval;
    if (stage === 0 && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
      if (timer === 1) {
        setTimeout(() => {
          setStage(1);
          setTimer(10);
        }, 1000);
      }
    } else if (stage === 1 && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
      if (timer === 1) {
        setTimeout(() => {
          setStage(2);
          setTimer(5);
        }, 1000);
      }
    } else if (stage === 2 && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
      if (timer === 1) {
        setTimeout(() => {
          setStage(0);
          setTimer(30);
        }, 1000);
      }
    }
    return () => clearInterval(interval);
  }, [timer, stage]);

  // ...existing code...

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
          {/* Searchbar or search button */}
          <div className="searchbar-area">
            {showSearch || !isMobile ? (
              <input
                className="search"
                placeholder="Search for a Sport, Game or Team"
                onBlur={() => setShowSearch(false)}
                autoFocus={isMobile && showSearch}
              />
            ) : (
              <button
                className="search-btn"
                onClick={() => setShowSearch(true)}
              >
                <svg width="22" height="22" fill="#ff6600" viewBox="0 0 24 24">
                  <path d="M21.71 20.29l-3.4-3.39A8.93 8.93 0 0019 11a9 9 0 10-9 9 8.93 8.93 0 005.9-1.69l3.39 3.4a1 1 0 001.42-1.42zM4 11a7 7 0 117 7 7 7 0 01-7-7z" />
                </svg>
              </button>
            )}
          </div>
          <button className="open-bets">OPEN BETS</button>
          <span className="balance">
            0.00 $
            <span role="img" aria-label="user">
              👤
            </span>
          </span>
        </div>
        {/* Center Content */}
        <GameScreen timer={timer} stage={stage} />
      </div>
    </div>
  );
}

export default Game;
