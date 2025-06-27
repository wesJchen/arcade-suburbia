import { useState } from 'react';
import './TicTacToeGame.css';

interface SquareProps {
  value: string | null;
  onClick: () => void;
  currentPlayer: string;
}

function Square({ value, onClick, currentPlayer }: SquareProps) {
  const isClickable = value === null || value === currentPlayer;
  const squareClass = `square ${value === 'X' ? 'square-x' : value === 'O' ? 'square-o' : ''}`;
  
  return (
    <button 
      className={squareClass}
      onClick={onClick}
      disabled={!isClickable}
    >
      {value}
    </button>
  );
}

function Game() {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameHistory, setGameHistory] = useState<{xWins: number, oWins: number}>({
    xWins: 0,
    oWins: 0
  });
  const [moveCount, setMoveCount] = useState(0);
  const [pieceOrder, setPieceOrder] = useState<{player: string, position: number}[]>([]);

  const handleClick = (i: number) => {
    if (calculateWinner(squares)) {
      return;
    }
    
    const currentPlayer = xIsNext ? 'X' : 'O';
    const nextSquares = squares.slice();
    const nextMoveCount = moveCount + 1;
    
    // If the square is already occupied by the current player, do nothing
    if (nextSquares[i] === currentPlayer) {
      return;
    }
    
    // Count current player's pieces
    const currentPlayerCount = nextSquares.filter(square => square === currentPlayer).length;
    
    if (nextSquares[i] === null) {
      // Placing a new piece
      if (currentPlayerCount >= 3) {
        // Remove the piece at position i-3 (oldest piece for this player)
        const oldestPieceIndex = pieceOrder.findIndex(p => p.player === currentPlayer);
        if (oldestPieceIndex !== -1) {
          const oldestPosition = pieceOrder[oldestPieceIndex].position;
          nextSquares[oldestPosition] = null;
          // Remove from piece order
          const nextPieceOrder = pieceOrder.filter((_, index) => index !== oldestPieceIndex);
          setPieceOrder(nextPieceOrder);
        }
      }
      nextSquares[i] = currentPlayer;
      // Add new piece to order
      setPieceOrder(prev => [...prev, {player: currentPlayer, position: i}]);
    } else {
      // Moving an existing piece
      if (currentPlayerCount >= 3) {
        // Remove the piece at position i-3 (oldest piece for this player)
        const oldestPieceIndex = pieceOrder.findIndex(p => p.player === currentPlayer);
        if (oldestPieceIndex !== -1) {
          const oldestPosition = pieceOrder[oldestPieceIndex].position;
          nextSquares[oldestPosition] = null;
          // Remove from piece order
          const nextPieceOrder = pieceOrder.filter((_, index) => index !== oldestPieceIndex);
          setPieceOrder(nextPieceOrder);
        }
      }
      nextSquares[i] = currentPlayer;
      // Add new piece to order
      setPieceOrder(prev => [...prev, {player: currentPlayer, position: i}]);
    }
    
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    setMoveCount(nextMoveCount);
  };

  const winner = calculateWinner(squares);
  const isDraw = squares.every(square => square) && !winner;
  
  const status = winner 
    ? `Winner: ${winner}` 
    : isDraw
    ? "Game is a draw!" 
    : `Current player: ${xIsNext ? 'X' : 'O'}`;

  const resetGame = () => {
    // Update game history before resetting
    if (winner) {
      setGameHistory(prev => ({
        ...prev,
        xWins: prev.xWins + (winner === 'X' ? 1 : 0),
        oWins: prev.oWins + (winner === 'O' ? 1 : 0)
      }));
    }
    
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setMoveCount(0);
    setPieceOrder([]);
  };

  const resetScoreboard = () => {
    setGameHistory({ xWins: 0, oWins: 0 });
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem'}}>
      <h1>Tic Tac Toe Game</h1>
      
      {/* Scoreboard */}
      <div className="scoreboard">
        <h2>Scoreboard</h2>
        <div className="score-grid">
          <div className="score-item">
            <span className="player-x">X</span>
            <span className="score">{gameHistory.xWins}</span>
          </div>
          <div className="score-item">
            <span className="player-o">O</span>
            <span className="score">{gameHistory.oWins}</span>
          </div>
        </div>
        <button className="reset-score-button" onClick={resetScoreboard}>
          Reset Scoreboard
        </button>
      </div>

      <div className="status">{status}</div>
      
      {/* Game Board */}
      <div className="board">
        <div className="board-row">
          <Square value={squares[0]} onClick={() => handleClick(0)} currentPlayer={xIsNext ? 'X' : 'O'} />
          <Square value={squares[1]} onClick={() => handleClick(1)} currentPlayer={xIsNext ? 'X' : 'O'} />
          <Square value={squares[2]} onClick={() => handleClick(2)} currentPlayer={xIsNext ? 'X' : 'O'} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onClick={() => handleClick(3)} currentPlayer={xIsNext ? 'X' : 'O'} />
          <Square value={squares[4]} onClick={() => handleClick(4)} currentPlayer={xIsNext ? 'X' : 'O'} />
          <Square value={squares[5]} onClick={() => handleClick(5)} currentPlayer={xIsNext ? 'X' : 'O'} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onClick={() => handleClick(6)} currentPlayer={xIsNext ? 'X' : 'O'} />
          <Square value={squares[7]} onClick={() => handleClick(7)} currentPlayer={xIsNext ? 'X' : 'O'} />
          <Square value={squares[8]} onClick={() => handleClick(8)} currentPlayer={xIsNext ? 'X' : 'O'} />
        </div>
      </div>
      
      <button className="reset-button" onClick={resetGame}>
        New Game
      </button>

      {/* Winner Display */}
      {winner && (
        <div className="winner-display">
          <h2 className="winner-text">{winner} is the Winner!</h2>
        </div>
      )}
    </div>
  );
}

function calculateWinner(squares: (string | null)[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;