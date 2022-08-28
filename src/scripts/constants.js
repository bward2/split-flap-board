export const splitFlapBoard = document.getElementById('split-flap-board');

export const getFlapSelectors = () => {
  const topNewFlaps = document.querySelectorAll('.top-new');
  const topCurrentFlaps = document.querySelectorAll('.top-current');
  const bottomNewFlaps = document.querySelectorAll('.bottom-new');
  const bottomCurrentFlaps = document.querySelectorAll('.bottom-current');

  return {
    topNewFlaps,
    topCurrentFlaps,
    bottomNewFlaps,
    bottomCurrentFlaps,
  };
};

export const testButtonFlip = document.getElementById('test-button-flip');
export const testButtonReset = document.getElementById('test-button-reset');

export const flipSpeed = 0.075;

export const boardRows = 4;
export const boardColumns = 15;

export const panelCharacters = [
  ' ',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
];

export const sounds = {
  FLIP: 'flip',
  FLAP: 'flap',
};

export const animations = {
  TOP_NEW_SLIDE: 'top-new-slide',
  TOP_CURRENT_FLIP: 'top-current-flip',
  BOTTOM_NEW_FLIP: 'bottom-new-flip',
  BOTTOM_CURRENT_SLIDE: 'bottom-current-slide',
  BOTTOM_CURRENT_BOUNCE: 'bottom-current-bounce',
};
