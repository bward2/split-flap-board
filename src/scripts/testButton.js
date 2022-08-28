import { getBoardStatus, redrawBoard, setBoardStatus } from './boardManager.js';
import {
  testButtonFlip,
  testButtonReset,
  panelCharacters,
  flipSpeed,
} from './constants.js';

testButtonFlip.onclick = () => {
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
  let redrawInterval;
  let newBoardStatus = getBoardStatus();

  for (let index = 0; index < getBoardStatus().length; index += 1) {
    newBoardStatus[index].target = 0;
  }

  setBoardStatus(newBoardStatus);

  redrawInterval = setInterval(() => {
    if (getBoardStatus()[0].actual === getBoardStatus()[0].target) {
      clearInterval(redrawInterval);
      return;
    }
    redrawBoard();
  }, flipSpeed * 1000);
};
