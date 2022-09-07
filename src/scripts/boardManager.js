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

const createTopFlap = () => {
  const newTopFlap = document.createElement('div');
  newTopFlap.innerText = panelCharacters[1];
  newTopFlap.classList.add('top-flap');

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
  topAnimations.push(newTopAnimation);

  topFlaps.push(newTopFlap);

  return newTopFlap;
};

const createDivider = () => {
  const newDividerDiv = document.createElement('div');
  newDividerDiv.classList.add('split-flap-divider');

  return newDividerDiv;
};

const createBottomFlap = () => {
  const newBottomFlap = document.createElement('div');
  newBottomFlap.innerText = panelCharacters[1];
  newBottomFlap.classList.add('bottom-flap');

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
      { transform: 'rotateX(0)' },
    ],
    {
      duration: flipSpeed * 1000,
      fill: 'forwards',
    }
  );
  newBottomAnimation.pause();
  bottomAnimations.push(newBottomAnimation);

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

      const newTopFlap = createTopFlap();
      const newDividerDiv = createDivider();
      const newBottomFlap = createBottomFlap();

      newPanelDiv.appendChild(newTopFlap);
      newPanelDiv.appendChild(newDividerDiv);
      newPanelDiv.appendChild(newBottomFlap);
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
