import { panelCharacters } from './constants.js';

let boardTarget = [panelCharacters[0]];
let boardMotionStatus = [false];

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
