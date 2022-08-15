import { panelCharacters } from './constants.js';

let boardTarget = [panelCharacters[0]];

export const setBoardTarget = (newTarget) => {
  boardTarget = newTarget;
};

export const getBoardTarget = () => {
  return boardTarget;
};
