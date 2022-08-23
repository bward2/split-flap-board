import {
  boardColumns,
  boardRows,
  panelCharacters,
  panelHtml,
  splitFlapBoard,
} from './constants.js';

let boardTarget = [];
let boardMotionStatus = [];

export const setBoardTarget = (newTarget) => {
  boardTarget = newTarget;
};

export const getBoardTarget = () => {
  return boardTarget;
};

export const setBoardMotionStatus = (index, newStatus) => {
  boardMotionStatus[index] = newStatus;
};

export const getBoardMotionStatus = () => {
  return boardMotionStatus;
};

const setup = () => {
  let newInnerHtml = '';

  for (let currentRow = 0; currentRow < boardRows; currentRow += 1) {
    for (let currentCol = 0; currentCol < boardColumns; currentCol += 1) {
      if (currentCol === 0) {
        newInnerHtml = `${newInnerHtml} <div class="split-flap-row">`;
      }
      newInnerHtml = `${newInnerHtml} ${panelHtml}`;
      if (currentCol === boardColumns - 1) {
        newInnerHtml = `${newInnerHtml} </div>`;
      }

      const index = currentRow * boardColumns + currentCol;
      boardTarget[index] = panelCharacters[0];
      boardMotionStatus[index] = false;
    }
  }

  splitFlapBoard.innerHTML = newInnerHtml;
};

setup();
