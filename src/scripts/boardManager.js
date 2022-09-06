import { boardColumns, boardRows, panelCharacters } from './constants.js';

const topFlaps = [];
const bottomFlaps = [];
const topAnimations = [];
const bottomAnimations = [];

const createTopFlap = () => {
  const newTopFlap = document.createElement('div');
  newTopFlap.innerText = panelCharacters[1];
  newTopFlap.classList.add('top-flap');

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

  bottomFlaps.push(newBottomFlap);

  return newBottomFlap;
};

const setup = () => {
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

setup();
