import {
  getBoardMotionStatus,
  getBoardTarget,
  setBoardMotionStatus,
  setBoardTarget,
} from './boardManager.js';
import {
  getFlapSelectors,
  testButtonFlip,
  testButtonReset,
  panelCharacters,
  flipSpeed,
} from './constants.js';
import { flipPanel } from './panelManager.js';

for (let index = 0; index < getBoardTarget().length; index++) {
  const { topNewFlaps, topCurrentFlaps, bottomNewFlaps, bottomCurrentFlaps } =
    getFlapSelectors();

  const topNewFlap = topNewFlaps[index];
  const topCurrentFlap = topCurrentFlaps[index];
  const bottomNewFlap = bottomNewFlaps[index];
  const bottomCurrentFlap = bottomCurrentFlaps[index];

  topNewFlap.style.animationDuration = `${flipSpeed}s`;
  topCurrentFlap.style.animationDuration = `${flipSpeed}s`;
  bottomNewFlap.style.animationDuration = `${flipSpeed}s`;
  bottomCurrentFlap.style.animationDuration = `${flipSpeed}s`;
}

const flipThem = () => {
  const { topCurrentFlaps } = getFlapSelectors();

  for (let index = 0; index < getBoardTarget().length; index++) {
    const panelIsInMotion = getBoardMotionStatus()[index];
    const panelMatchesTarget =
      topCurrentFlaps[index].innerHTML === getBoardTarget()[index];

    if (!panelIsInMotion && !panelMatchesTarget) {
      setBoardMotionStatus(index, true);
      flipPanel(index);
    }
  }
};

testButtonFlip.onclick = () => {
  const currentIndex = panelCharacters.indexOf(getBoardTarget()[0]);
  const targetIndex =
    currentIndex === panelCharacters.length - 1 ? 0 : currentIndex + 1;

  let newBoardTarget = [];

  for (let index = 0; index < getBoardTarget().length; index += 1) {
    newBoardTarget.push(panelCharacters[targetIndex]);
  }

  setBoardTarget(newBoardTarget);
  flipThem();
};

testButtonReset.onclick = () => {
  let newBoardTarget = [];

  for (let index = 0; index < getBoardTarget().length; index += 1) {
    newBoardTarget.push(panelCharacters[0]);
  }

  setBoardTarget(newBoardTarget);
  flipThem();
};
