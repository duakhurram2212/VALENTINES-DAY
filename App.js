import React, { useState, useEffect } from 'react';
import './App.css';
import FloatingElements from './components/blob'; // Floating hearts, flowers, etc.
import Game from './components/game'; // The series of games

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [valentineAsked, setValentineAsked] = useState(false);
  const [infiniteFormed, setInfiniteFormed] = useState(false);
  const [pressCount, setPressCount] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ left: '50%', top: '50%' });
  const [showMessage, setShowMessage] = useState(false); // New state for the message

  const startGame = () => {
    setGameStarted(true);
  };

  const endGame = () => {
    setGameEnded(true);
  };

  const askValentine = () => {
    setPressCount(pressCount + 1);
    if (pressCount + 1 === 5) {
      setInfiniteFormed(true);
    }
  };

  const declineValentine = () => {
    setValentineAsked(false);
    setGameStarted(false);
    setGameEnded(false);
  };

  // Function to move the "NO" button randomly when hovered
  const moveNoButton = () => {
    const randomLeft = Math.floor(Math.random() * 80) + 10;  // Random left position between 10% and 90%
    const randomTop = Math.floor(Math.random() * 80) + 10;   // Random top position between 10% and 90%
    setNoButtonPosition({ left: `${randomLeft}%`, top: `${randomTop}%` });
  };

  const handleYesClick = () => {
    setShowMessage(true);  // Show the message when "YES" is clicked
  };

  return (
    <div className="app-container">
      <header>
        <h1 className="main-heading">HAPPY VALENTINE'S DAY 💖</h1>
        {!gameStarted && (
          <>
            <p className="subheading">Do you want to have a short tour? 🌹</p>
            <div className="buttons-container">
              <button className="interactive-button" onClick={startGame}>YES 💌</button>
              <button className="interactive-button" onClick={startGame}>HELL YEAH 💘</button>
            </div>
          </>
        )}
      </header>

      {/* Game Screen */}
      {gameStarted && !gameEnded && (
        <Game endGame={endGame} />
      )}

      {/* Valentine Question Screen */}
      {gameEnded && !valentineAsked && (
        <div className="valentine-question">
          <h2 className="question-heading">The games end. Now back to the real question:</h2>
          <h3 className="question-subheading">WILL YOU BE MY VALENTINE? 💖</h3>
          <button className="interactive-button" onClick={handleYesClick}>YES 💘</button>
          <button
            className="interactive-button no-button"
            onMouseEnter={moveNoButton}  // When hovered, move the "NO" button
            style={{ left: noButtonPosition.left, top: noButtonPosition.top }}
            onClick={declineValentine}
          >
            NO 💔
          </button>
        </div>
      )}

      {/* Full-Screen Message with Floating Elements */}
      {showMessage && (
        <div className="full-screen-message">
          <h2>YAYYYYYY..🎉🏆🥳, You really didn't have a choice EVER. 😜     &  Some phools for my fool.</h2>
          <div className="floating-background">
            <div className="floating-heart">🌹</div>
            <div className="floating-rose">🌹</div>
            <div className="floating-balloon">🌹</div>
            <div className="floating-heart">🌹</div>
            <div className="floating-rose">🌹</div>
            <div className="floating-heart">🌹</div>
            <div className="floating-rose">🌹</div>
            <div className="floating-balloon">🌹</div>
            <div className="floating-heart">🌹</div>
            <div className="floating-rose">🌹</div>
            <div className="floating-heart">🌹</div>
            <div className="floating-rose">🌹</div>
            <div className="floating-balloon">🌹</div>
            <div className="floating-heart">🌹</div>
            <div className="floating-rose">🌹</div>
          </div>
        </div>
      )}

      {/* Guy and Girl Moving Toward Each Other */}
      {pressCount < 5 && !infiniteFormed && (
        <div className="couple">
          <div className="guy" style={{ left: `${pressCount * 20}px` }}>💙</div>
          <div className="girl" style={{ right: `${pressCount * 20}px` }}>💗</div>
        </div>
      )}

      {/* Hug and Infinite Heart Animation after 5 YES */}
      {pressCount === 5 && !infiniteFormed && (
        <div className="couple-hug">
          <div className="hugging">🤗</div>
          <div className="infinite-heart">
            <h4>YOU ARE IN THIS FOR-FREAKING-EVER! 💞</h4>
            <div className="heart-infinite">
              <span>💖💖</span>
              <span>💖💖</span>
              <span>💖💖</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Elements - only show before the game starts */}
      {!gameStarted && <FloatingElements />}
    </div>
  );
};

export default App;
