import { Routes, Route, useNavigate } from 'react-router-dom';
import Game from './pages/TicTacToeGame';
import './App.css';

function Landing() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/game');
  };

  return (
    <div className="app-container">
      <h1 className="title">Tic Tac Toe</h1>
      <p className="subtitle">Play against a friend or challenge the AI</p>
      <button className="start-button" onClick={handleStartClick}>
        Start Game
      </button>
      <footer className="footer">Made with React + TypeScript + Vite</footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}

export default App;
