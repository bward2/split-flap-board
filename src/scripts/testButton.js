import { getBoardTarget, setBoardTarget } from './boardManager.js';
import {
  topFullFlaps,
  topHalfFlaps,
  bottomHalfFlaps,
  bottomFullFlaps,
  testButtonFlip,
  testButtonReset,
  panelCharacters,
  flipSpeed,
  sounds,
} from './constants.js';
import { flipPanel } from './panelManager.js';
import { playSound } from './soundManager.js';

for (let index = 0; index < topFullFlaps.length; index++) {
  const topFullFlap = topFullFlaps[index];
  const topHalfFlap = topHalfFlaps[index];
  const bottomHalfFlap = bottomHalfFlaps[index];
  const bottomFullFlap = bottomFullFlaps[index];

  topFullFlap.style.animationDuration = `${flipSpeed}s`;
  topHalfFlap.style.animationDuration = `${flipSpeed}s`;
  bottomHalfFlap.style.animationDuration = `${flipSpeed}s`;
  bottomFullFlap.style.animationDuration = `${flipSpeed}s`;
}

const flipThem = () => {
  for (let index = 0; index < topFullFlaps.length; index++) {
    flipPanel(index);
  }
};

testButtonFlip.onclick = () => {
  testButtonFlip.disabled = true;
  testButtonReset.disabled = true;

  const currentIndex = panelCharacters.indexOf(getBoardTarget()[0]);
  const targetIndex =
    currentIndex === panelCharacters.length - 1 ? 0 : currentIndex + 1;

  setBoardTarget(panelCharacters[targetIndex]);
  flipThem();
};

testButtonReset.onclick = () => {
  testButtonFlip.disabled = true;
  testButtonReset.disabled = true;

  setBoardTarget(panelCharacters[0]);
  flipThem();
};
