import {
  boardColumns,
  boardRows,
  keyboardAlphabetKeysContainer,
  keyboardContainer,
  keyboardNumberAndSymbolKeysContainer,
  panelCharacters,
  secondaryKeyboardBottomRow,
  secondaryKeyboardMiddleRow,
  showKeyboardButton,
  tertiaryKeyboardMiddleRow,
  tertiaryKeyboardBottomRow,
  toggleKeysButtonPrimary,
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

    switch (key) {
      case undefined:
        return;
      case 'BACKSPACE':
        this.handleBackspace();
        return;
      case 'SPACE':
        this.handleSpace();
        return;
      case 'TOGGLE-KEYS-PRIMARY':
        this.handlePrimaryToggleKey();
        return;
      case 'TOGGLE-KEYS-SECONDARY':
        this.handleSecondaryToggleKey();
        return;
      case 'TOGGLE-KEYS-TERTIARY':
        this.handleTertiaryToggleKey();
        return;
      case 'RESET':
        this.handleReset();
        return;
      default:
        this.handleKey(key);
    }
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

  handlePrimaryToggleKey() {
    if (
      toggleKeysButtonPrimary.innerText ===
      toggleKeysButtonTexts.NUMBERS_AND_SYMBOLS
    ) {
      toggleKeysButtonPrimary.innerText = toggleKeysButtonTexts.ALPHABET;
      keyboardAlphabetKeysContainer.style.display = 'none';
      keyboardNumberAndSymbolKeysContainer.style.display = 'block';
    } else {
      toggleKeysButtonPrimary.innerText =
        toggleKeysButtonTexts.NUMBERS_AND_SYMBOLS;
      keyboardNumberAndSymbolKeysContainer.style.display = 'none';
      keyboardAlphabetKeysContainer.style.display = 'block';
    }
  }

  handleSecondaryToggleKey() {
    secondaryKeyboardMiddleRow.style.display = 'none';
    secondaryKeyboardBottomRow.style.display = 'none';

    tertiaryKeyboardMiddleRow.style.display = 'flex';
    tertiaryKeyboardBottomRow.style.display = 'flex';
  }

  handleTertiaryToggleKey() {
    tertiaryKeyboardMiddleRow.style.display = 'none';
    tertiaryKeyboardBottomRow.style.display = 'none';

    secondaryKeyboardMiddleRow.style.display = 'flex';
    secondaryKeyboardBottomRow.style.display = 'flex';
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
