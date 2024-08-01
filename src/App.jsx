/* eslint-disable react/prop-types */
import { useState } from 'react'

import './assets/style.css'

function Square({ value, handler }) {
  return <button className='square' onClick={handler}>{value}</button>
}

function Board(isXisNext, values, onPlay) {


  function handlerClick(index) {
    if (values[index] || calculateWinner(values)) return;

    const newValues = values.slice();
    newValues[index] = isXisNext ? 'X' : 'O';
    onPlay(newValues);
  }

  const winner = calculateWinner(values);
  let status = winner ? 'Winner : ' + winner : 'Next Player : ' + (isXisNext ? 'X' : 'O');

  return (
    <>
      <div className="status">{status}</div>
      <div className='board'>
        {values.map((item, index) => <Square key={index} value={item} handler={() => handlerClick(index)} />)}
      </div>
    </>
  )
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentValues = history[currentMove];

  function handlerPlay(nextValues) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextValues];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    description = move > 0 ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className='game'>
      <div className="game-board">
        <Board isXisNext={xIsNext} values={currentValues} onPlay={handlerPlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateWinner(values) {
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
    if (values[a] && values[a] === values[b] && values[b] === values[c]) {
      return values[a]
    }
  }
  return null;
}