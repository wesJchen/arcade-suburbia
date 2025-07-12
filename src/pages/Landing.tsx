import { useNavigate } from 'react-router-dom';
import '../App.css';

function Landing() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/game');
  };

  return (
    <div className="app-container">
      <div className="arcade-header">
        <div className="neon-sign">ARCADE</div>
        <div className="suburbia-sign">SUBURBIA</div>
      </div>
      
      <div className="game-title">
        <h1 className="title">TIC TAC TOE</h1>
        <div className="title-glow"></div>
      </div>
      
      <div className="arcade-machine">
        <div className="screen">
          <div className="screen-content">
            <p className="subtitle">Welcome to the neighborhood arcade!</p>
            <p className="description">Challenge your friends in this classic game of strategy</p>
            <div className="pixel-art">
              <div className="pixel-house">🏠</div>
              <div className="pixel-tree">🌳</div>
              <div className="pixel-car">🚗</div>
            </div>
          </div>
        </div>
        <div className="joystick-area">
          <div className="joystick"></div>
        </div>
      </div>
      
      <button className="start-button" onClick={handleStartClick}>
        <span className="button-text">INSERT COIN</span>
        <span className="button-glow"></span>
      </button>
      
      <div className="arcade-footer">
        <div className="high-scores">
          <h3>HIGH SCORES</h3>
          <div className="score-list">
            <div className="score-item">1. PLAYER X - 15 WINS</div>
            <div className="score-item">2. PLAYER O - 12 WINS</div>
            <div className="score-item">3. NEIGHBOR - 8 WINS</div>
          </div>
        </div>
        <footer className="footer">ARCADE SUBURBIA © 2024</footer>
      </div>
    </div>
  );
}

export default Landing; 