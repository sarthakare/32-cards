import crownImg from "../assets/images/crown.png";
import React, { useMemo, useState, useEffect } from "react";
import "../styles/GameScreen.css";
import tableImg from "../assets/images/worli-bg.jpg";
import newRoundImg from "../assets/images/New_Round.svg";
import welcomeGif from "../assets/images/Indian01_Welcome.gif";
import idleGif from "../assets/images/Indian01_idle.gif";
import clappingGif from "../assets/images/Indian01_Clapping.gif";

// Vite/ESM compatible import for all card images
import QSS from "../assets/images/cards/QSS.webp";
import QHH from "../assets/images/cards/QHH.webp";
import QDD from "../assets/images/cards/QDD.webp";
import QCC from "../assets/images/cards/QCC.webp";
import KSS from "../assets/images/cards/KSS.webp";
import KHH from "../assets/images/cards/KHH.webp";
import KDD from "../assets/images/cards/KDD.webp";
import KCC from "../assets/images/cards/KCC.webp";
import JSS from "../assets/images/cards/JSS.webp";
import JHH from "../assets/images/cards/JHH.webp";
import JDD from "../assets/images/cards/JDD.webp";
import JCC from "../assets/images/cards/JCC.webp";
import S9S from "../assets/images/cards/9SS.webp";
import S9H from "../assets/images/cards/9HH.webp";
import S9D from "../assets/images/cards/9DD.webp";
import S9C from "../assets/images/cards/9CC.webp";
import S8S from "../assets/images/cards/8SS.webp";
import S8H from "../assets/images/cards/8HH.webp";
import S8D from "../assets/images/cards/8DD.webp";
import S8C from "../assets/images/cards/8CC.webp";
import S7S from "../assets/images/cards/7SS.webp";
import S7H from "../assets/images/cards/7HH.webp";
import S7D from "../assets/images/cards/7DD.webp";
import S7C from "../assets/images/cards/7CC.webp";
import S6S from "../assets/images/cards/6SS.webp";
import S6H from "../assets/images/cards/6HH.webp";
import S6D from "../assets/images/cards/6DD.webp";
import S6C from "../assets/images/cards/6CC.webp";
import S10S from "../assets/images/cards/10SS.webp";
import S10H from "../assets/images/cards/10HH.webp";
import S10D from "../assets/images/cards/10DD.webp";
import S10C from "../assets/images/cards/10CC.webp";
import closedCard from "../assets/images/closed-card.jpg";

const cardImages = {
  "QSS.webp": QSS, "QHH.webp": QHH, "QDD.webp": QDD, "QCC.webp": QCC,
  "KSS.webp": KSS, "KHH.webp": KHH, "KDD.webp": KDD, "KCC.webp": KCC,
  "JSS.webp": JSS, "JHH.webp": JHH, "JDD.webp": JDD, "JCC.webp": JCC,
  "10SS.webp": S10S, "10HH.webp": S10H, "10DD.webp": S10D, "10CC.webp": S10C,
  "9SS.webp": S9S, "9HH.webp": S9H, "9DD.webp": S9D, "9CC.webp": S9C,
  "8SS.webp": S8S, "8HH.webp": S8H, "8DD.webp": S8D, "8CC.webp": S8C,
  "7SS.webp": S7S, "7HH.webp": S7H, "7DD.webp": S7D, "7CC.webp": S7C,
  "6SS.webp": S6S, "6HH.webp": S6H, "6DD.webp": S6D, "6CC.webp": S6C
};

// Card value and type arrays
const cardValue = ["6", "7", "8", "9", "10", "J", "Q", "K"];
const cardType = ["CC", "DD", "HH", "SS"];

// Generate all possible card image filenames for these values/types
const cardImageFiles = [];
for (let v of cardValue) {
  for (let t of cardType) {
    let name = v;
    if (["J", "Q", "K"].includes(v)) name = v;
    cardImageFiles.push(`${name}${t}.webp`);
  }
}

const oddsData = [
  { player: "Player 8", back: 12.2, lay: 13.7, odd: 1.97, even: 1.97 },
  { player: "Player 9", back: 5.95, lay: 6.45, odd: 1.97, even: 1.97 },
  { player: "Player 10", back: 3.2, lay: 3.45, odd: 1.97, even: 1.97 },
  { player: "Player 11", back: 2.08, lay: 2.18, odd: 1.97, even: 1.97 },
];

const cardLabels = [
  { label: "8+", count: 8 },
  { label: "9+", count: 9 },
  { label: "10+", count: 10 },
  { label: "11+", count: 11 },
];

function getRandomCards(arr, n) {
  // Returns n unique random elements from arr
  const copy = [...arr];
  const result = [];
  for (let i = 0; i < n && copy.length > 0; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(idx, 1)[0]);
  }
  return result;
}

function GameScreen({ timer, stage }) {
  // Responsive: detect mobile screen
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 900 : false);
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 900);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // Show new round image for 3 seconds at the start of each round
  const [showNewRound, setShowNewRound] = useState(false);
  useEffect(() => {
    if (stage === 0) {
      setShowNewRound(true);
      const timeout = setTimeout(() => setShowNewRound(false), 3000);
      return () => clearTimeout(timeout);
    } else {
      setShowNewRound(false);
    }
  }, [stage]);
  let gifToShow = welcomeGif;
  if (stage === 1) gifToShow = idleGif;
  if (stage === 2) gifToShow = clappingGif;

  // For the first 30 seconds (stage 0), show closed cards and "please place bets now"
  // After 30 seconds (stage 1 or 2), show 4 random cards instead of closed cards
  const showRandomCards = stage !== 0;
  // Memoize random cards for the round (changes only when stage goes from 0 to 1)
  const randomCards = useMemo(() => {
    if (showRandomCards) {
      return getRandomCards(cardImageFiles, 4);
    }
    return [];
  }, [showRandomCards]);

  // Reveal cards one by one with 2s delay after showRandomCards becomes true
  const [revealedCount, setRevealedCount] = useState(0);
  useEffect(() => {
    if (showRandomCards) {
      setRevealedCount(0);
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setRevealedCount((prev) => {
          if (prev < 4) return prev + 1;
          return prev;
        });
        if (i >= 4) clearInterval(interval);
      }, 2000);
      return () => clearInterval(interval);
    } else {
      setRevealedCount(0);
    }
  }, [showRandomCards, randomCards]);

  return (
    <div className="center-content">
      {/* Table Area */}
      <div className="table-area">
        <div className="table-header">
          <span>
            Teen Patti <span className="rules-link">Rules</span>
          </span>
          <span className="round-id">
            Round ID: V32C11751270914 | Player History
          </span>
        </div>
        <div className="table-parent"> 
          {/* Show New Round image overlay for 3 seconds at round start */}
          {showNewRound && (
            <div className="newRoundOverlay">
              <img src={newRoundImg} alt="New Round" className="newRoundImg" />
            </div>
          )}
          <img src={tableImg} alt="table" className="table-image" />
          <div className="table-cards">
            <div className="table-cards-row">
              <img src={gifToShow} alt="Welcome" className="welcome-gif" />
            </div>
            <div className="table-cards-row cards-row">
              {cardLabels.map((card, idx) => {
                // Determine the value to show at card-count
                let showValue = 0;
                if (showRandomCards && randomCards[idx] && idx < revealedCount) {
                  const file = randomCards[idx];
                  let val = file.replace(/[^A-Z0-9]/gi, "").replace(/(CC|DD|HH|SS).*$/, "");
                  if (["J"].includes(val)) showValue = 11;
                  else if (["Q"].includes(val)) showValue = 12;
                  else if (["K"].includes(val)) showValue = 13;
                  else showValue = Number(val);
                }
                // Add the default value from cardLabels to showValue, but only after reveal
                let totalValue = 0;
                if (showRandomCards && randomCards[idx] && idx < revealedCount) {
                  totalValue = Number(card.count) + Number(showValue);
                }
                return (
                  <div className="table-card" key={idx}>
                    <div className="card-label">{card.label}</div>
                    <img
                      src={showRandomCards && randomCards[idx] && idx < revealedCount && cardImages[randomCards[idx]] ? cardImages[randomCards[idx]] : closedCard}
                      alt="Card"
                      className="card-value-img"
                    />
                    <div className="cardCount">
                      {totalValue}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="table-timer">
              <span className="flip-clock">
                {String(timer).padStart(2, "0")}
              </span>
            </div>
            {/* Show crown and winner after all cards are revealed and clappingGif is shown */}
            {stage === 2 && revealedCount >= 4 && (() => {
              // Calculate total values for all cards
              const totals = cardLabels.map((card, idx) => {
                let showValue = 0;
                if (showRandomCards && randomCards[idx]) {
                  const file = randomCards[idx];
                  let val = file.replace(/[^A-Z0-9]/gi, "").replace(/(CC|DD|HH|SS).*$/, "");
                  if (["J"].includes(val)) showValue = 11;
                  else if (["Q"].includes(val)) showValue = 12;
                  else if (["K"].includes(val)) showValue = 13;
                  else showValue = Number(val);
                }
                return Number(card.count) + Number(showValue);
              });
              // Find the index of the highest total value
              const maxValue = Math.max(...totals);
              const winnerIdx = totals.indexOf(maxValue);
              const winnerLabel = cardLabels[winnerIdx]?.label || "";
              return (
                <div className="winnerOverlay">
                  <div className="winnerBox">
                    <img src={crownImg} alt="Crown" className="crownImg" />
                    <span className="winnerTitle">Winner</span>
                    <span className="winnerLabel">{winnerLabel}</span>
                  </div>
                </div>
              );
            })()}
            {stage === 0 && (
              <div className="placeBetsNow">
                <span className="bets-icon" role="img" aria-label="bet">💰</span>
                <span className="bets-text">Place Your Bets Now!</span>
                <span className="bets-anim"></span>
              </div>
            )}
          </div>
        </div>
        <div className="odds-tables-wrap">
          <table className="odds-table odds-backlay">
            <thead>
              <tr>
                <th>Player</th>
                <th>Back</th>
                <th>Lay</th>
              </tr>
            </thead>
            <tbody>
              {oddsData.map((row, i) => (
                <tr key={i}>
                  <td>{row.player}</td>
                  <td className="back">{row.back}</td>
                  <td className="lay">{row.lay}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="odds-table odds-oddeven">
            <thead>
              <tr>
                <th>Player</th>
                <th>Odd</th>
                <th>Even</th>
              </tr>
            </thead>
            <tbody>
              {oddsData.map((row, i) => (
                <tr key={i}>
                  <td>{row.player}</td>
                  <td className="odd-even">{row.odd}</td>
                  <td className="odd-even">{row.even}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Right Panel: Hide on mobile */}
      {!isMobile && (
        <div className="right-panel">
          <div className="my-bet-header">
            My Bet <span className="myBetBalance">Bal:0</span>
          </div>
          <table className="my-bet-table">
            <thead>
              <tr>
                <th>Matched Bet</th>
                <th>Odds</th>
                <th>Stake</th>
              </tr>
            </thead>
            <tbody>{/* Empty for now */}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default GameScreen;
