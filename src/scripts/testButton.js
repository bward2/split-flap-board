import { getBoardStatus, redrawBoard, setBoardStatus } from './boardManager.js';
import {
  testButtonFlip,
  testButtonReset,
  panelCharacters,
} from './constants.js';

testButtonFlip.onclick = () => {
  const currentIndex = panelCharacters.indexOf(getBoardStatus()[0]);
  const targetIndex =
    currentIndex === panelCharacters.length - 1 ? 0 : currentIndex + 1;

  let newBoardStatus = getBoardStatus();

  for (let index = 0; index < getBoardStatus().length; index += 1) {
    const newTarget =
      newBoardStatus[index].target === panelCharacters.length - 1
        ? 0
        : newBoardStatus[index].target + 1;
    newBoardStatus[index].target = newTarget;
  }

  setBoardStatus(newBoardStatus);
  redrawBoard();
};

testButtonReset.onclick = () => {
  let newBoardTarget = [];

  for (let index = 0; index < getBoardStatus().length; index += 1) {
    newBoardTarget.push(panelCharacters[0]);
  }

  setBoardStatus(newBoardTarget);
  // flipThem();
};
