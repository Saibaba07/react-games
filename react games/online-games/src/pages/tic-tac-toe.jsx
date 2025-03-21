import React, { useState } from "react";
import "../styles/tic-tac-toe.css";
import { Link } from "react-router-dom";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isAI, setIsAI] = useState(false);

  const result = calculateWinner(board);
  const winningSquares = result ? result.winningSquares : [];
  const isDraw = !winner && board.every((square) => square !== null);

  const handleClick = (index) => {
    if (board[index] || winner || isDraw) return;
    
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const result = calculateWinner(newBoard);
    if (result) {
      setWinner(result.winner);
    }

    if (isAI && !winner && !isDraw) {
      setTimeout(() => aiMove(newBoard), 500);
    }
  };

  const aiMove = (currentBoard) => {
    const bestMove = getBestMove(currentBoard);
    if (bestMove !== -1) {
      const newBoard = [...currentBoard];
      newBoard[bestMove] = "O";
      setBoard(newBoard);
      setIsXNext(true);

      const result = calculateWinner(newBoard);
      if (result) {
        setWinner(result.winner);
      }
    }
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="tictactoe-container">
      <h1>Tic-Tac-Toe</h1>
      <h2 className="status">
        {winner ? `Winner: ${winner}` : isDraw ? "It's a Draw!" : `Next Player: ${isXNext ? "X" : "O"}`}
      </h2>

      <div className="mode-toggle">
        <button className={`toggle-btn ${!isAI ? "active" : ""}`} onClick={() => setIsAI(false)}>Two Player Mode</button>
        <button className={`toggle-btn ${isAI ? "active" : ""}`} onClick={() => setIsAI(true)}>Play Against AI</button>
      </div>

      <div className="board">
        {board.map((square, index) => (
          <button key={index} className={`square ${winningSquares.includes(index) ? "winner" : ""}`} onClick={() => handleClick(index)}>
            {square}
          </button>
        ))}
      </div>

      <button className="reset-btn" onClick={restartGame}>Restart Game</button>
      <button className="reset-btn">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>Go to Home</Link>
      </button>
    </div>
  );
};

// ✅ AI Minimax Algorithm
const getBestMove = (board) => {
  let bestScore = -Infinity;
  let move = -1;

  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      board[i] = "O"; // AI move
      let score = minimax(board, false);
      board[i] = null; // Undo move
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
};

const minimax = (board, isMaximizing) => {
  const result = calculateWinner(board);
  if (result) return result.winner === "O" ? 1 : -1;
  if (board.every((square) => square !== null)) return 0;

  let bestScore = isMaximizing ? -Infinity : Infinity;

  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      board[i] = isMaximizing ? "O" : "X";
      let score = minimax(board, !isMaximizing);
      board[i] = null;
      bestScore = isMaximizing ? Math.max(score, bestScore) : Math.min(score, bestScore);
    }
  }
  return bestScore;
};

// ✅ Winner Calculation
const calculateWinner = (board) => {
  const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], winningSquares: pattern };
    }
  }
  return null;
};

export default TicTacToe;
