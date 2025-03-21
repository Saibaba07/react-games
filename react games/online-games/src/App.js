import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import TicTacToe from "./pages/tic-tac-toe";
import MemoryGame from "./pages/memory";
import Snake from "./pages/snake";
import Chess from "./pages/chess";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/t" element={<TicTacToe />} /> 
        <Route path="/m" element={<MemoryGame />} />
        <Route path="/s" element={<Snake />} />
        <Route path="/c" element={<Chess />} />
      </Routes>
    </Router>
  );
}

export default App;
