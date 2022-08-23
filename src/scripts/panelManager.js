import { getBoardTarget, setBoardMotionStatus } from './boardManager.js';
import {
  getFlapSelectors,
  panelCharacters,
  animations,
  sounds,
  flipSpeed,
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
  const { topNewFlaps, topCurrentFlaps, bottomNewFlaps, bottomCurrentFlaps } =
    getFlapSelectors();

  const topNewFlap = topNewFlaps[index];
  const topCurrentFlap = topCurrentFlaps[index];
  const bottomNewFlap = bottomNewFlaps[index];
  const bottomCurrentFlap = bottomCurrentFlaps[index];

  removeAnimation(bottomCurrentFlap, animations.BOTTOM_CURRENT_BOUNCE);
  addAnimation(topNewFlap, animations.TOP_NEW_SLIDE);
  addAnimation(topCurrentFlap, animations.TOP_CURRENT_FLIP);
  addAnimation(bottomNewFlap, animations.BOTTOM_NEW_FLIP);
  addAnimation(bottomCurrentFlap, animations.BOTTOM_CURRENT_SLIDE);

  playSound(sounds.FLIP);

  setTimeout(() => {
    playSound(sounds.FLAP);

    const currentCharacter = panelCharacters.indexOf(topNewFlap.innerHTML);
    const newCharacter =
      currentCharacter === panelCharacters.length - 1
        ? 0
        : currentCharacter + 1;

    setFlapCharacter(topNewFlap, panelCharacters[newCharacter]);
    setFlapCharacter(topCurrentFlap, panelCharacters[currentCharacter]);
    setFlapCharacter(bottomNewFlap, panelCharacters[newCharacter]);
    setFlapCharacter(bottomCurrentFlap, panelCharacters[currentCharacter]);

    removeAnimation(topNewFlap, animations.TOP_NEW_SLIDE);
    removeAnimation(topCurrentFlap, animations.TOP_CURRENT_FLIP);
    removeAnimation(bottomNewFlap, animations.BOTTOM_NEW_FLIP);
    removeAnimation(bottomCurrentFlap, animations.BOTTOM_CURRENT_SLIDE);

    if (topCurrentFlap.innerHTML === getBoardTarget()[index]) {
      addAnimation(bottomCurrentFlap, animations.BOTTOM_CURRENT_BOUNCE);
      setBoardMotionStatus(index, false);

      return;
    } else {
      flipPanel(index);
    }
  }, flipSpeed * 1000);
};
