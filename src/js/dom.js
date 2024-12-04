import knightImg from '../img/noun-chess-knight-108491.svg';
import { knightMoves, convertToCoordinates } from './app.js';
export function fillChessboard() {
  const chessboard = document.getElementById('chessboard');
  const colors = ['white', 'black'];

  for (let i = 1; i <= 9; i++) {
    for (let j = -1; j <= 7; j++) {
      if (i == 9 && j != -1) {
        // Add x labels -> a - h
        const xLabel = document.createElement('div');
        xLabel.classList.add('xLabel');
        xLabel.textContent = `${String.fromCharCode(97 + j)}`;
        chessboard.append(xLabel);
      } else if (j == -1 && i != 9) {
        // Add y labels -> 1 - 8
        const yLabel = document.createElement('div');
        yLabel.classList.add('yLabel');
        yLabel.textContent = `${9 - i}`;
        chessboard.append(yLabel);
      } else {
        // Add chessboard squares
        const square = document.createElement('div');
        square.classList.add('square');
        if (!(j == -1 && i == 9)) {
          square.classList.add(colors[(i + j) % 2]);
        }
        square.id = `${String.fromCharCode(97 + j)}${9 - i}`;
        chessboard.append(square);
      }
    }
  }
}

const placeKnight = (pos) => {
  const prevSquare = document.querySelector('.hasKnight');
  if (prevSquare !== null) {
    prevSquare.style.backgroundImage = '';
    prevSquare.classList.remove('hasKnight');
  }
  const square = document.getElementById(`${pos.toLowerCase()}`);
  square.classList.add('hasKnight');
  square.style.backgroundImage = `url(${knightImg})`;
};

const placeGoal = (pos) => {
  const prevSquare = document.querySelector('.isGoal');
  if (prevSquare !== null) {
    prevSquare.textContent = '';
    prevSquare.classList.remove('isGoal');
  }

  const square = document.getElementById(`${pos.toLowerCase()}`);
  square.classList.add('isGoal');
};

const placePath = (path) => {
  // Remove previous path
  Array.from(document.getElementsByClassName('pathSquare')).forEach((square) => {
    square.classList.remove('pathSquare');
    square.textContent = '';
  });

  let i = 1;
  path.slice(1).forEach((node) => {
    const square = document.getElementById(node);
    square.classList.add('pathSquare');
    square.textContent = i++;
  });
  printOutput(path);
};

const printOutput = (path) => {
  const moves = document.querySelector('.moves-ans');
  moves.textContent = path.length - 1;
  const paths = document.querySelector('.path-ans');
  paths.textContent = '';
  path.forEach((node) => {
    paths.textContent += `${node} -> `;
  });
  paths.textContent = paths.textContent.slice(0, -3);
};

export function addEventListeners() {
  const knightPos = document.getElementById('knight-pos');
  const goalPos = document.getElementById('goal');

  knightPos.addEventListener('input', () => {
    if (knightPos.checkValidity()) {
      placeKnight(knightPos.value);

      if (goalPos.checkValidity()) {
        placePath(
          knightMoves(convertToCoordinates(knightPos.value), convertToCoordinates(goalPos.value))
        );
      }
    }
  });

  goalPos.addEventListener('input', () => {
    if (goalPos.checkValidity()) {
      placeGoal(goalPos.value);

      if (knightPos.checkValidity()) {
        placePath(
          knightMoves(convertToCoordinates(knightPos.value), convertToCoordinates(goalPos.value))
        );
      }
    }
  });
}
