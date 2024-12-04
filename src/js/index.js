import '../css/styles.css';
import '../css/fontello.css';
import { fillChessboard, addEventListeners } from './dom.js';

document.addEventListener('DOMContentLoaded', () => {
  fillChessboard();
  addEventListeners();
});
