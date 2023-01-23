export const splitFlapBoard = document.getElementById('split-flap-board');

export const showKeyboardButton = document.getElementById(
  'show-keyboard-button'
);
export const hideKeyboardButton = document.getElementById(
  'hide-keyboard-button'
);
export const keyboardContainer = document.getElementById('keyboard-container');
export const keyboardAlphabetKeysContainer = document.getElementById(
  'alphabet-keys-container'
);
export const keyboardNumberAndSymbolKeysContainer = document.getElementById(
  'number-and-symbol-keys-container'
);
export const toggleKeysButtonPrimary = document.getElementById(
  'toggle-keys-button-primary'
);
export const toggleKeysButtonSecondary = document.getElementById(
  'toggle-keys-button-secondary'
);
export const secondaryKeyboardMiddleRow = document.getElementById(
  'secondary-keyboard-middle-row'
);
export const secondaryKeyboardBottomRow = document.getElementById(
  'secondary-keyboard-bottom-row'
);
export const tertiaryKeyboardMiddleRow = document.getElementById(
  'tertiary-keyboard-middle-row'
);
export const tertiaryKeyboardBottomRow = document.getElementById(
  'tertiary-keyboard-bottom-row'
);

export const themeSwitch = document.getElementById('theme-switch');
export const testButtonFlip = document.getElementById('test-button-flip');

export const flipAnimationDurationInMilliseconds = 75;
export const framesPerFlipAnimation = 20;

export const boardRows = 6;
export const boardColumns = 22;

export const panelCharacters = Array.from(
  `` +
    // Blank space
    ` ` +
    // Letters
    `ABCDEFGHIJKLMNOPQRSTUVWXYZ` +
    // Symbols
    `!@#$&()-+=;:'"%,.?°/` +
    // Numbers
    `1234567890` +
    // Colors
    `⬛⬜🟥🟧🟨🟩🟦🟪`
);

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

export const toggleKeysButtonTexts = {
  ALPHABET: 'ABC',
  NUMBERS_AND_SYMBOLS: '?123',
};
