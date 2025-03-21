import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css"; // Import CSS for styling

// Import images
import ticTacToeImg from "../assets/tic tac toe.png";
import memoryGameImg from "../assets/memory.jpeg";
import snakeGameImg from "../assets/snake game.webp";
import chessGameImg from "../assets/chess.png";

const games = [
  { id: 1, name: "Tic Tac Toe", image: ticTacToeImg, path: "/t" },
  { id: 2, name: "Memory Game", image: memoryGameImg, path: "/m" },
  { id: 3, name: "Snake Game", image: snakeGameImg, path: "/s" },
  { id: 4, name: "Chess Game", image: chessGameImg, path: "/c" }
];

const Play = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter games based on search input
  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="play-container">
      <h1 className="play-title">Choose a Game</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for a game..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Game Cards */}
      <div className="game-grid">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <Link to={game.path} key={game.id} className="game-card">
              <img src={game.image} alt={game.name} className="game-image" />
              <p className="game-name">{game.name}</p>
            </Link>
          ))
        ) : (
          <p className="no-results">No games found</p>
        )}
      </div>
    </div>
  );
};

export default Play;
