import { getBoardTarget, setBoardMotionStatus } from './boardManager.js';
import {
  topFullFlaps,
  topHalfFlaps,
  bottomHalfFlaps,
  bottomFullFlaps,
  panelCharacters,
  animations,
  sounds,
  flipSpeed,
  testButtonFlip,
  testButtonReset,
} from './constants.js';
import { playSound } from './soundManager.js';

export const removeAnimation = (element, animation) => {
  element.classList.remove(animation);
  void element.offsetWidth;
};

export const addAnimation = (element, animation) => {
  removeAnimation(element, animation);
  element.classList.add(animation);
};

export const setFlapCharacter = (element, character) => {
  element.innerHTML = character;
};

export const flipPanel = (index) => {
  const topFullFlap = topFullFlaps[index];
  const topHalfFlap = topHalfFlaps[index];
  const bottomHalfFlap = bottomHalfFlaps[index];
  const bottomFullFlap = bottomFullFlaps[index];

  addAnimation(topFullFlap, animations.TOP_FULL_SLIDE);
  addAnimation(topHalfFlap, animations.TOP_HALF_FLIP);
  addAnimation(bottomHalfFlap, animations.BOTTOM_HALF_FLIP);

  playSound(sounds.FLIP);

  setTimeout(() => {
    playSound(sounds.FLAP);

    const current = panelCharacters.indexOf(topFullFlap.innerHTML);
    const next = current === panelCharacters.length - 1 ? 0 : current + 1;

    setFlapCharacter(topFullFlap, panelCharacters[next]);
    setFlapCharacter(topHalfFlap, panelCharacters[current]);
    setFlapCharacter(bottomHalfFlap, panelCharacters[next]);
    setFlapCharacter(bottomFullFlap, panelCharacters[current]);

    removeAnimation(topFullFlap, animations.TOP_FULL_SLIDE);
    removeAnimation(topHalfFlap, animations.TOP_HALF_FLIP);
    removeAnimation(bottomHalfFlap, animations.BOTTOM_HALF_FLIP);

    if (topHalfFlap.innerHTML === getBoardTarget()[index]) {
      addAnimation(bottomFullFlap, animations.BOTTOM_FULL_BOUNCE);
      setBoardMotionStatus(index, false);

      return;
    } else {
      flipPanel(index);
    }
  }, flipSpeed * 1000);
};
