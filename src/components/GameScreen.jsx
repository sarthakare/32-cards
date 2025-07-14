import React from "react";
import tableImg from "../assets/images/worli-bg.jpg";
import welcomeGif from "../assets/images/Indian01_Welcome.gif";
import idleGif from "../assets/images/Indian01_idle.gif";
import clappingGif from "../assets/images/Indian01_Clapping.gif";
import closedCard from "../assets/images/closed-card.jpg";

const oddsData = [
  { player: "Player 8", back: 12.2, lay: 13.7, odd: 1.97, even: 1.97 },
  { player: "Player 9", back: 5.95, lay: 6.45, odd: 1.97, even: 1.97 },
  { player: "Player 10", back: 3.2, lay: 3.45, odd: 1.97, even: 1.97 },
  { player: "Player 11", back: 2.08, lay: 2.18, odd: 1.97, even: 1.97 },
];

const cardLabels = [
  { label: "8+", count: 0 },
  { label: "9+", count: 0 },
  { label: "10+", count: 0 },
  { label: "11+", count: 0 },
];

function GameScreen({ timer, stage }) {
  let gifToShow = welcomeGif;
  if (stage === 1) gifToShow = idleGif;
  if (stage === 2) gifToShow = clappingGif;

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
          <img src={tableImg} alt="table" className="table-image" />
          <div className="table-cards">
            <div className="table-cards-row">
              <img src={gifToShow} alt="Welcome" className="welcome-gif" />
            </div>
            <div className="table-cards-row cards-row">
              {cardLabels.map((card, idx) => (
                <div className="table-card" key={idx}>
                  <div className="card-label">{card.label}</div>
                  <img
                    src={closedCard}
                    alt="Card"
                    className="card-value-img"
                  />
                  <div className="card-count">{card.count}</div>
                </div>
              ))}
            </div>
            <div className="table-timer">
              <span className="flip-clock">
                {String(timer).padStart(2, "0")}
              </span>
            </div>
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
      {/* Right Panel */}
      <div className="right-panel">
        <div className="my-bet-header">
          My Bet <span style={{ float: "right" }}>Bal:0</span>
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
    </div>
  );
}

export default GameScreen;
