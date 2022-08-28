import { getBoardStatus, redrawBoard, setBoardStatus } from './boardManager.js';
import {
  testButtonFlip,
  testButtonReset,
  panelCharacters,
  flipSpeed,
} from './constants.js';

testButtonFlip.onclick = () => {
  setInterval(() => {
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
  }, flipSpeed * 1000);
};

testButtonReset.onclick = () => {
  let newBoardTarget = [];

  for (let index = 0; index < getBoardStatus().length; index += 1) {
    newBoardTarget.push(panelCharacters[0]);
  }

  setBoardStatus(newBoardTarget);
  // flipThem();
};
