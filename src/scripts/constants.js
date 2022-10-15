export const splitFlapBoard = document.getElementById('split-flap-board');

export const themeSwitch = document.getElementById('theme-switch');
export const testButtonFlip = document.getElementById('test-button-flip');
export const testButtonReset = document.getElementById('test-button-reset');

export const flipAnimationDurationInMilliseconds = 75;
export const framesPerFlipAnimation = 20;

export const boardRows = 6;
export const boardColumns = 22;

export const panelCharacters = [
  // Blank Space
  ' ',
  // Alphabet
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
  // Symbols
  '!',
  '@',
  '#',
  '$',
  '&',
  '(',
  ')',
  '-',
  '+',
  '=',
  ';',
  ':',
  "'",
  '"',
  '%',
  ',',
  '.',
  '?',
  '°',
  '/',
  // Numbers
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  // Colors
  '⬛',
  '⬜',
  '🟥',
  '🟧',
  '🟨',
  '🟩',
  '🟦',
  '🟪',
];

export const sounds = {
  FLIP: 'flip',
  FLAP: 'flap',
};

export const themes = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const events = {
  REQUEST_PLAY_SOUND: 'REQUEST_PLAY_SOUND',
};
