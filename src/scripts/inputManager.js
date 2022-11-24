import {
  boardColumns,
  boardRows,
  keyboardContainer,
  panelCharacters,
  showKeyboardButton,
} from './constants.js';

export class InputManager {
  constructor(setHighlightedPanel, flipSinglePanel) {
    this.setHighlightedPanel = setHighlightedPanel;
    this.flipSinglePanel = flipSinglePanel;
    this.liveTypingPanelIndex = null;
    this.liveTypingActive = false;

    showKeyboardButton.onclick = () => {
      showKeyboardButton.style.visibility = 'hidden';
      keyboardContainer.style.visibility = 'visible';

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

    this.handleKey(key);
  }

  handleBackspace() {
    this.flipSinglePanel(0);

    if (this.liveTypingPanelIndex > 0) {
      this.liveTypingPanelIndex -= 1;
      this.setHighlightedPanel(this.liveTypingPanelIndex);
    }
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
