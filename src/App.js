import { useState } from 'react';
import './styles.css';

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  function handleClick(i){
    if (calculateWinner(squares)|| squares[i]){
      return;
    } 
    const nextSquares = squares.slice();
    if (xIsNext){
      nextSquares[i] = "X";
    }else{
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext); //to flip the boolean state value and switch players
  }
  const winner = calculateWinner(squares);
  let status;
  let count = 0;
  for (let i = 0; i < 9; i++) {
    if (squares[i] === null) {
      break;
    }else{
      count++;
    }
  }
  if (winner) {
    status = "Winner of the match is " + winner;
    <button>Click here to reset</button>
  } else if (count === 9){
    status = "It's a draw!";
  }else{
    status = "Player's Turn: " + (xIsNext ? "X" : "O");
  }
  
  return (
    <>
    <h1>Tic-Tac-Toe Game</h1>
    <h2 className="status">{status}</h2>
    <div className="board-row">
          <Square value ={squares[0]} onSquareClick={()=>handleClick(0)} />
          <Square  value={squares[1]} onSquareClick={()=>handleClick(1)} />
          <Square  value={squares[2]} onSquareClick={()=>handleClick(2)} />
    </div>
    <div className="board-row">
          <Square  value={squares[3]} onSquareClick={()=>handleClick(3)} />
          <Square  value={squares[4]} onSquareClick={()=>handleClick(4)} />
          <Square  value={squares[5]} onSquareClick={()=>handleClick(5)} />
      </div>
    <div className="board-row">
          <Square value={squares[6]} onSquareClick={()=>handleClick(6)} />
          <Square value={squares[7]} onSquareClick={()=>handleClick(7)} />
          <Square value={squares[8]} onSquareClick={()=>handleClick(8)} />
        </div>
        <button className="button" onClick={resetGame}>Click here to reset</button>
        </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square({ value, onSquareClick}){
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}