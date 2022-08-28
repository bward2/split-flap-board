import {
  boardColumns,
  boardRows,
  panelCharacters,
  splitFlapBoard,
} from './constants.js';

let boardStatus = [];

export const setBoardStatus = (newTarget) => {
  boardStatus = newTarget;
};

export const getBoardStatus = () => {
  return boardStatus;
};

const getPanelHtml = (panelIndex) => {
  const currentIndex = getBoardStatus()[panelIndex].target;
  let nextIndex = currentIndex + 1;

  if (nextIndex === panelCharacters.length) {
    nextIndex = 0;
  }

  return `
  <div class="split-flap-panel">
    <div class="new-card-overlay-top"></div>
    <div class="top-new">${panelCharacters[currentIndex]}</div>
    <div class="top-current">${panelCharacters[currentIndex]}</div>
    <div class="split-flap-divider"></div>
    <div class="bottom-new">${panelCharacters[nextIndex]}</div>
    <div class="bottom-current">${panelCharacters[currentIndex]}</div>
    <div class="new-card-overlay-bottom"></div>
  </div>
`;
};

export const redrawBoard = () => {
  let newInnerHtml = '';

  for (let currentRow = 0; currentRow < boardRows; currentRow += 1) {
    for (let currentCol = 0; currentCol < boardColumns; currentCol += 1) {
      if (currentCol === 0) {
        newInnerHtml = `${newInnerHtml} <div class="split-flap-row">`;
      }

      const panelIndex = currentRow * boardColumns + currentCol;
      const panelHtml = getPanelHtml(panelIndex);
      newInnerHtml = `${newInnerHtml} ${panelHtml}`;

      if (currentCol === boardColumns - 1) {
        newInnerHtml = `${newInnerHtml} </div>`;
      }
    }
  }

  splitFlapBoard.innerHTML = newInnerHtml;
};

const setup = () => {
  for (let currentRow = 0; currentRow < boardRows; currentRow += 1) {
    for (let currentCol = 0; currentCol < boardColumns; currentCol += 1) {
      const index = currentRow * boardColumns + currentCol;
      boardStatus[index] = {
        current: 0,
        target: 0,
        inMotion: false,
      };
    }
  }

  redrawBoard();
};

setup();
