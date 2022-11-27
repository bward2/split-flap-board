import {
  boardColumns,
  boardRows,
  keyboardAlphabetKeysContainer,
  keyboardContainer,
  keyboardNumberAndSymbolKeysContainer,
  panelCharacters,
  showKeyboardButton,
  toggleKeysButton,
  toggleKeysButtonTexts,
} from './constants.js';

export class InputManager {
  constructor(setHighlightedPanel, flipSinglePanel, resetAllPanels) {
    this.setHighlightedPanel = setHighlightedPanel;
    this.flipSinglePanel = flipSinglePanel;
    this.resetAllPanels = resetAllPanels;
    this.liveTypingPanelIndex = null;
    this.liveTypingActive = false;

    showKeyboardButton.onclick = () => {
      showKeyboardButton.style.display = 'none';
      keyboardContainer.style.display = 'block';

      this.toggleLiveTyping();
    };

    for (const keyboardRow of keyboardContainer.children) {
      for (const key of keyboardRow.children) {
        key.addEventListener('click', this.handleInput.bind(this));
      }
    }
  }

  toggleLiveTyping() {
    this.liveTypingActive = !this.liveTypingActive;

    if (this.liveTypingActive) {
      this.liveTypingPanelIndex = 0;
      this.setHighlightedPanel(0);
    } else {
      this.liveTypingPanelIndex = null;
      this.setHighlightedPanel(null);
    }
  }

  handleInput(event) {
    const key = event.target.dataset.key;

    if (key === undefined) {
      return;
    }

    if (key === 'BACKSPACE') {
      this.handleBackspace();
      return;
    }

    if (key === 'SPACE') {
      this.handleSpace();
      return;
    }

    if (key === 'TOGGLE-KEYS') {
      this.handleToggleKeys();
      return;
    }

    if (key === 'RESET') {
      this.handleReset();
      return;
    }

    this.handleKey(key);
  }

  handleBackspace() {
    this.flipSinglePanel(0);

    if (this.liveTypingPanelIndex > 0) {
      this.liveTypingPanelIndex -= 1;
      this.setHighlightedPanel(this.liveTypingPanelIndex);
    }
  }

  handleSpace() {
    this.flipSinglePanel(0);

    if (this.liveTypingPanelIndex < boardColumns * boardRows - 1) {
      this.liveTypingPanelIndex += 1;
      this.setHighlightedPanel(this.liveTypingPanelIndex);
    }
  }

  handleToggleKeys() {
    if (
      toggleKeysButton.innerText === toggleKeysButtonTexts.NUMBERS_AND_SYMBOLS
    ) {
      toggleKeysButton.innerText = toggleKeysButtonTexts.ALPHABET;
      keyboardAlphabetKeysContainer.style.display = 'none';
      keyboardNumberAndSymbolKeysContainer.style.display = 'block';
    } else {
      toggleKeysButton.innerText = toggleKeysButtonTexts.NUMBERS_AND_SYMBOLS;
      keyboardNumberAndSymbolKeysContainer.style.display = 'none';
      keyboardAlphabetKeysContainer.style.display = 'block';
    }
  }

  handleReset() {
    this.resetAllPanels();
  }

  handleKey(key) {
    const targetCharacterIndex = panelCharacters.indexOf(key);
    this.flipSinglePanel(targetCharacterIndex);

    if (this.liveTypingPanelIndex < boardColumns * boardRows - 1) {
      this.liveTypingPanelIndex += 1;
      this.setHighlightedPanel(this.liveTypingPanelIndex);
    }
  }
}
