import { Routes, Route } from 'react-router-dom';
import Game from './pages/TicTacToeGame';
import Landing from './pages/Landing';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}

export default App;
