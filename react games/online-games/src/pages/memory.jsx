import React, { useState, useEffect } from "react";
import "../styles/memory.css";
import { Link } from "react-router-dom";

// Symbols for memory cards (pairs)
const symbols = ["🍎", "🍌", "🍇", "🍉", "🍍", "🥕", "🥑", "🍒", "🌽", "🍕",
                 "🍎", "🍌", "🍇", "🍉", "🍍", "🥕", "🥑", "🍒", "🌽", "🍕"];

// Function to shuffle and initialize cards
const shuffleCards = () => {
  return [...symbols]
    .sort(() => Math.random() - 0.5)
    .map((symbol, index) => ({
      id: index,
      symbol,
      isFlipped: false,
      isMatched: false
    }));
};

// Memory Game Component
const MemoryGame = ({ initialTurn = 1, initialScores = { player1: 0, player2: 0 } }) => {
  const [cards, setCards] = useState(shuffleCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(initialTurn);
  const [scores, setScores] = useState(initialScores);

  // Check for match when two cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;

      if (first.symbol === second.symbol) {
        // ✅ Mark matched cards
        setCards(prevCards =>
          prevCards.map(card =>
            card.symbol === first.symbol ? { ...card, isMatched: true } : card
          )
        );

        // ✅ Update score
        setScores(prevScores => ({
          ...prevScores,
          [playerTurn === 1 ? "player1" : "player2"]:
            prevScores[playerTurn === 1 ? "player1" : "player2"] + 1
        }));

        setFlippedCards([]);
      } else {
        // ❌ Not a match: Flip cards back after delay
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === first.id || card.id === second.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setPlayerTurn(playerTurn === 1 ? 2 : 1); // Switch turn
        }, 1000);
      }
    }
  }, [flippedCards, playerTurn]);

  // Flip a card
  const flipCard = (id) => {
    let card = cards.find(c => c.id === id);
    if (!card || card.isFlipped || card.isMatched || flippedCards.length >= 2) return; // Prevent invalid flips

    setCards(prevCards =>
      prevCards.map(c => (c.id === id ? { ...c, isFlipped: true } : c))
    );
    setFlippedCards(prev => [...prev, card]);
  };

  // Restart game
  const restartGame = () => {
    setCards(shuffleCards());
    setFlippedCards([]);
    setPlayerTurn(initialTurn);
    setScores(initialScores);
  };

  return (
    <div className="memory-game-container">
      <h1>Memory Game</h1>
      <h2>Player {playerTurn}'s Turn</h2>
      <div className="scores">
        <p>Player 1: {scores.player1}</p>
        <p>Player 2: {scores.player2}</p>
      </div>
      <div className="board1">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.isFlipped ? "flipped" : ""} ${card.isMatched ? "matched" : ""}`}
            onClick={() => flipCard(card.id)}
          >
            {card.isFlipped || card.isMatched ? card.symbol : "❓"}
          </div>
        ))}
      </div>
      <button className="reset-btn" onClick={restartGame}>Restart Game</button>
      <button className="reset-btn">
        <Link to="/">Go back to Home</Link>
      </button>
    </div>
  );
};

export default MemoryGame;
