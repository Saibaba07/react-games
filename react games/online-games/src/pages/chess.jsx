import React, { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { useNavigate } from "react-router-dom";
import "../styles/chess.css"; // Import CSS

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const navigate = useNavigate();

  // Handle move (only allow legal moves)
  const handleMove = (source, target) => {
    const newGame = new Chess(game.fen());
    const move = newGame.move({ from: source, to: target, promotion: "q" });

    if (move) {
      setGame(newGame);
      setTimeout(() => makeAIMove(newGame), 500);
    }
  };

  // AI Makes a Random Move
  const makeAIMove = (gameInstance) => {
    const possibleMoves = gameInstance.moves();
    if (possibleMoves.length === 0) return; // Game over

    const randomMove =
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    gameInstance.move(randomMove);
    setGame(new Chess(gameInstance.fen()));
  };

  // Reset the game
  const resetGame = () => {
    setGame(new Chess());
  };

  return (
    <div className="chess-container">
      <h1>Chess Game</h1>
      <Chessboard
        position={game.fen()}
        onPieceDrop={(source, target) => handleMove(source, target)}
        boardWidth={600} // Enlarged Board
      />
      <div className="buttons">
        <button className="reset-btn" onClick={resetGame}>Reset Game</button>
        <button className="home-btn" onClick={() => navigate("/")}>Go to Home</button>
      </div>
    </div>
  );
};

export default ChessGame;
