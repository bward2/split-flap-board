import {
  boardColumns,
  boardRows,
  flipSpeed,
  panelCharacters,
  splitPanelHeight,
  splitPanelDividerHeight,
  halfSplitPanelDividerHeight,
} from './constants.js';

export const topFlaps = [];
export const bottomFlaps = [];
export const topAnimations = [];
export const bottomAnimations = [];

const createTopFlap = (characterIndex) => {
  const newTopFlap = document.createElement('div');
  newTopFlap.innerText = panelCharacters[characterIndex];
  newTopFlap.classList.add('top-flap');
  newTopFlap.style.zIndex = panelCharacters.length - characterIndex;

  const newTopAnimation = newTopFlap.animate(
    [
      { transform: 'rotateX(0)' },
      {
        transform: `rotateX(-90deg) translateZ(${halfSplitPanelDividerHeight})`,
        opacity: 1,
        offset: 0.5,
      },
      {
        opacity: 0,
        offset: 0.51,
      },
      {
        transform: `rotateX(-90deg) translateZ(${halfSplitPanelDividerHeight})`,
        opacity: 0,
      },
    ],
    {
      duration: flipSpeed * 1000,
      fill: 'forwards',
    }
  );
  newTopAnimation.pause();
  topAnimations[topAnimations.length - 1].push(newTopAnimation);

  topFlaps.push(newTopFlap);

  return newTopFlap;
};

const createDivider = () => {
  const newDividerDiv = document.createElement('div');
  newDividerDiv.classList.add('split-flap-divider');

  return newDividerDiv;
};

const createBottomFlap = (characterIndex) => {
  const newBottomFlap = document.createElement('div');
  newBottomFlap.innerText = panelCharacters[characterIndex + 1];
  newBottomFlap.classList.add('bottom-flap');
  newBottomFlap.style.zIndex = characterIndex;

  const newBottomAnimation = newBottomFlap.animate(
    [
      {
        transform: `rotateX(90deg) translateZ(${halfSplitPanelDividerHeight})`,
        opacity: 0,
      },
      {
        opacity: 0,
        offset: 0.49,
      },
      {
        transform: `rotateX(90deg) translateZ(${halfSplitPanelDividerHeight})`,
        opacity: 1,
        offset: 0.5,
      },
      { transform: `rotateX(0) translateZ(${halfSplitPanelDividerHeight})` },
    ],
    {
      duration: flipSpeed * 1000,
      fill: 'forwards',
    }
  );
  newBottomAnimation.pause();
  bottomAnimations[bottomAnimations.length - 1].push(newBottomAnimation);

  bottomFlaps.push(newBottomFlap);

  return newBottomFlap;
};

const setCssVariables = () => {
  const root = document.querySelector(':root');
  root.style.setProperty('--split-panel-height', splitPanelHeight);
  root.style.setProperty(
    '--split-panel-divider-height',
    splitPanelDividerHeight
  );
};

const populateBoard = () => {
  const splitFlapBoard = document.getElementById('split-flap-board');

  for (let row = 0; row < boardRows; row += 1) {
    const newRowDiv = document.createElement('div');
    newRowDiv.classList.add('split-flap-row');

    for (let column = 0; column < boardColumns; column += 1) {
      const newPanelDiv = document.createElement('div');
      newPanelDiv.classList.add('split-flap-panel');

      topAnimations.push([]);
      bottomAnimations.push([]);

      for (let characterIndex = 0; characterIndex < 2; characterIndex += 1) {
        const newTopFlap = createTopFlap(characterIndex);
        const newBottomFlap = createBottomFlap(characterIndex);

        newPanelDiv.appendChild(newTopFlap);
        newPanelDiv.appendChild(newBottomFlap);
      }
      const newDividerDiv = createDivider();
      newPanelDiv.appendChild(newDividerDiv);

      newRowDiv.appendChild(newPanelDiv);
    }

    splitFlapBoard.appendChild(newRowDiv);
  }
};

const setup = () => {
  setCssVariables();
  populateBoard();
};

setup();
