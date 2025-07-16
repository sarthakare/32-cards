import crownImg from "../assets/images/crown.png";
import React, { useState, useEffect } from "react";
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




// Hardcoded card filenames for each label (first draw)
const fixedCardFiles = [
  "10SS.webp", // 8+
  "JSS.webp",  // 9+
  "KSS.webp",  // 10+
  "QSS.webp"   // 11+
];

// For tie-breaker, new cards to draw (can be randomized or fixed for demo)
const tieBreakerCardFiles = [
  "6SS.webp", // 8+
  "7SS.webp", // 9+
  "8SS.webp", // 10+
  "9SS.webp"  // 11+
];

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



function GameScreen() {
  // Timer and stage logic moved from game.jsx
  const [timer, setTimer] = useState(3);
  const [stage, setStage] = useState(0); // 0: welcome, 1: idle, 2: clapping

  useEffect(() => {
    let interval;
    if (stage === 0 && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
      if (timer === 1) {
        setTimeout(() => {
          setStage(1);
          setTimer(15);
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
          setTimer(3);
        }, 1000);
      }
    }
    return () => clearInterval(interval);
  }, [timer, stage]);
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



  // Card reveal and tie-breaker logic (per-card reveal with delay)
  const [revealedCards, setRevealedCards] = useState([false, false, false, false]);
  const [tieBreakerActive, setTieBreakerActive] = useState(false);
  const [tiedIndices, setTiedIndices] = useState([]);
  // Track which cards have a tie-breaker card drawn (per index)
  const [tieBreakerDrawn, setTieBreakerDrawn] = useState([false, false, false, false]);
  const [winnerSelected, setWinnerSelected] = useState(false);

  // Reveal cards one by one with 3 seconds delay when stage changes from 0 to 1
  useEffect(() => {
    let revealTimeouts = [];
    if (stage === 1) {
      setRevealedCards([false, false, false, false]);
      setTieBreakerActive(false);
      setTiedIndices([]);
      setTieBreakerDrawn([false, false, false, false]);
      setWinnerSelected(false);
      // Reveal each card with 3s delay
      for (let i = 0; i < 4; i++) {
        revealTimeouts[i] = setTimeout(() => {
          setRevealedCards(prev => {
            const updated = [...prev];
            updated[i] = true;
            return updated;
          });
        }, 3000 * (i + 1));
      }
      // After all cards revealed, check for tie after a short delay
      const afterRevealDelay = 3000 * 4 + 500;
      const tieTimeout = setTimeout(() => {
        const totals = cardLabels.map((card, idx) => {
          let showValue = 0;
          if (idx === 0) showValue = 10;
          else if (idx === 1) showValue = 11;
          else if (idx === 2) showValue = 13;
          else if (idx === 3) showValue = 12;
          return Number(card.count) + Number(showValue);
        });
        const maxValue = Math.max(...totals);
        const tied = totals
          .map((val, idx) => (val === maxValue ? idx : -1))
          .filter(idx => idx !== -1);
        if (tied.length > 1) {
          setTieBreakerActive(true);
          setTiedIndices(tied);
          // Increase timer when tie is detected
          setTimer(prev => Math.max(prev, 10));
          // Reveal tie-breaker cards one by one for tied indices
          let tieBreakerTimeouts = [];
          tied.forEach((tieIdx, i) => {
            tieBreakerTimeouts[i] = setTimeout(() => {
              setTieBreakerDrawn(prev => {
                const updated = [...prev];
                updated[tieIdx] = true;
                return updated;
              });
            }, 3000 * (i + 1));
          });
          // After all tie-breaker cards revealed, select winner after a short delay
          const afterTieBreakerDelay = 3000 * tied.length + 1000;
          tieBreakerTimeouts.push(setTimeout(() => setWinnerSelected(true), afterTieBreakerDelay));
        } else {
          // No tie, select winner after 1s
          setTimeout(() => setWinnerSelected(true), 1000);
        }
      }, afterRevealDelay);
      revealTimeouts.push(tieTimeout);
    } else {
      setRevealedCards([false, false, false, false]);
      setTieBreakerActive(false);
      setTiedIndices([]);
      setTieBreakerDrawn([false, false, false, false]);
      setWinnerSelected(false);
    }
    return () => {
      revealTimeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [stage]);

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
                // Hardcoded values for each card
                let showValue = 0;
                if (revealedCards[idx]) {
                  if (idx === 0) showValue = 10;
                  else if (idx === 1) showValue = 11;
                  else if (idx === 2) showValue = 13;
                  else if (idx === 3) showValue = 12;
                }
                // Only tied cards get a tie-breaker card drawn beside them
                const showTieBreaker = !!tieBreakerDrawn[idx];
                let tieBreakerValue = 0;
                if (showTieBreaker) {
                  if (idx === 0) tieBreakerValue = 2;
                  else if (idx === 1) tieBreakerValue = 3;
                  else if (idx === 2) tieBreakerValue = 4;
                  else if (idx === 3) tieBreakerValue = 5;
                }
                // For tied cards, add the drawn value to the initial value
                let totalValue = revealedCards[idx] ? Number(card.count) + Number(showValue) + (showTieBreaker ? tieBreakerValue : 0) : 0;

                return (
                  <div className="table-card" key={idx}>
                    <div className="card-label">{card.label}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img
                        src={revealedCards[idx] && cardImages[fixedCardFiles[idx]] ? cardImages[fixedCardFiles[idx]] : closedCard}
                        alt="Card"
                        className="card-value-img"
                      />
                      {showTieBreaker && (
                        <img
                          src={cardImages[tieBreakerCardFiles[idx]]}
                          alt="Tie Breaker Card"
                          className="card-value-img tie-breaker-img"
                          style={{ marginLeft: 8 }}
                        />
                      )}
                    </div>
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
            {/* Show crown and winner after all cards are revealed and tie-breaker (if any) is done */}
            {winnerSelected && (() => {
              // If tie-breaker is active and revealed, use tie-breaker values to determine winner
              let winnerIdx = -1;
              let winnerLabel = "";
              // Always use the displayed totalValue for winner selection
              const totals = cardLabels.map((card, idx) => {
                let showValue = 0;
                if (idx === 0) showValue = 10;
                else if (idx === 1) showValue = 11;
                else if (idx === 2) showValue = 13;
                else if (idx === 3) showValue = 12;
                let tieBreakerValue = 0;
                if (tieBreakerDrawn[idx]) {
                  if (idx === 0) tieBreakerValue = 2;
                  else if (idx === 1) tieBreakerValue = 3;
                  else if (idx === 2) tieBreakerValue = 4;
                  else if (idx === 3) tieBreakerValue = 5;
                }
                return Number(card.count) + Number(showValue) + tieBreakerValue;
              });
              const maxValue = Math.max(...totals);
              const winnerIndex = totals.indexOf(maxValue);
              const winnerLbl = cardLabels[winnerIndex]?.label || "";
              return (
                <>
                  <div className="winnerOverlay">
                    <div className="winnerBox">
                      <img src={crownImg} alt="Crown" className="crownImg" />
                      <span className="winnerTitle">Winner</span>
                      <span className="winnerLabel">{winnerLbl}</span>
                    </div>
                  </div>
                  {/* Show clapping gif after winner is selected */}
                  <img src={clappingGif} alt="Clapping" className="winner-gif" style={{ position: 'absolute', left: '50%', top: '60%', transform: 'translate(-50%, -50%)', zIndex: 10, width: 120 }} />
                </>
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
