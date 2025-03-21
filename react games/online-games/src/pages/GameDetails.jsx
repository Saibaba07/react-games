import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    axios.get(`https://www.freetogame.com/api/game?id=${id}`)
      .then(response => setGame(response.data))
      .catch(error => console.error("Error fetching game details:", error));
  }, [id]);

  if (!game) return <h2>Loading...</h2>;

  return (
    <div className="game-details">
      <h1>{game.title}</h1>
      <img src={game.thumbnail} alt={game.title} className="game-image" />
      <p>{game.description}</p>
      <a href={game.game_url} target="_blank" rel="noopener noreferrer">
        <button className="play-btn">Play Now</button>
      </a>
      <Link to="/">
        <button className="back-btn">Back to Home</button>
      </Link>
    </div>
  );
};

export default GameDetails;