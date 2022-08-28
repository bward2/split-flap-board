import {
  animations,
  boardColumns,
  boardRows,
  flipSpeed,
  panelCharacters,
  splitFlapBoard,
} from './constants.js';
import { playSound } from './soundManager.js';

let boardStatus = [];

export const setBoardStatus = (newTarget) => {
  boardStatus = newTarget;
};

export const getBoardStatus = () => {
  return boardStatus;
};

const getPanelHtml = (panelIndex) => {
  const currentIndex = getBoardStatus()[panelIndex].actual;
  let nextIndex = currentIndex + 1;

  if (nextIndex === panelCharacters.length) {
    nextIndex = 0;
  }

  let panelHtml;

  if (
    getBoardStatus()[panelIndex].target !== getBoardStatus()[panelIndex].actual
  ) {
    panelHtml = `
      <div class="split-flap-panel">
        <div class="new-card-overlay-top"></div>
        <div class="top-new ${animations.TOP_NEW_SLIDE}" style="animation-duration: ${flipSpeed}s;">${panelCharacters[nextIndex]}</div>
        <div class="top-current ${animations.TOP_CURRENT_FLIP}" style="animation-duration: ${flipSpeed}s;">${panelCharacters[currentIndex]}</div>
        <div class="split-flap-divider"></div>
        <div class="bottom-new ${animations.BOTTOM_NEW_FLIP}" style="animation-duration: ${flipSpeed}s;">${panelCharacters[nextIndex]}</div>
        <div class="bottom-current ${animations.BOTTOM_CURRENT_SLIDE}" style="animation-duration: ${flipSpeed}s;">${panelCharacters[currentIndex]}</div>
        <div class="new-card-overlay-bottom"></div>
      </div>
    `;

    // TODO: Put this elsewhere
    boardStatus[panelIndex].actual = nextIndex;
  } else {
    panelHtml = `
      <div class="split-flap-panel">
        <div class="new-card-overlay-top"></div>
        <div class="top-new">${panelCharacters[nextIndex]}</div>
        <div class="top-current">${panelCharacters[currentIndex]}</div>
        <div class="split-flap-divider"></div>
        <div class="bottom-new">${panelCharacters[nextIndex]}</div>
        <div class="bottom-current">${panelCharacters[currentIndex]}</div>
        <div class="new-card-overlay-bottom"></div>
      </div>
    `;
  }

  return panelHtml;
};

export const redrawBoard = () => {
  let newInnerHtml = '';

  playSound('flip');

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
        actual: 0,
        target: 0,
        inMotion: false,
      };
    }
  }

  redrawBoard();
};

setup();
