import {
  getBoardMotionStatus,
  getBoardTarget,
  setBoardMotionStatus,
  setBoardTarget,
} from './boardManager.js';
import {
  topNewFlaps,
  topCurrentFlaps,
  bottomNewFlaps,
  bottomCurrentFlaps,
  testButtonFlip,
  testButtonReset,
  panelCharacters,
  flipSpeed,
} from './constants.js';
import { flipPanel } from './panelManager.js';

for (let index = 0; index < topNewFlaps.length; index++) {
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
  for (let index = 0; index < topNewFlaps.length; index++) {
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

  setBoardTarget([panelCharacters[targetIndex]]);
  flipThem();
};

testButtonReset.onclick = () => {
  setBoardTarget([panelCharacters[0]]);
  flipThem();
};
