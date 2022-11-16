import { keyboardContainer } from './constants.js';

export class InputManager {
  constructor(updateLiveTypingPanelIndex) {
    this.liveTypingPanelIndex = null;
    this.updateLiveTypingPanelIndex = updateLiveTypingPanelIndex;
    this.liveTypingActive = false;

    for (const keyboardRow of keyboardContainer.children) {
      for (const key of keyboardRow.children) {
        key.addEventListener('click', (event) => {
          console.log(event.target.dataset.key);
          this.liveTypingPanelIndex += 1;
          this.updateLiveTypingPanelIndex(this.liveTypingPanelIndex);
        });
      }
    }
  }

  toggleLiveTyping() {
    this.liveTypingActive = !this.liveTypingActive;

    if (this.liveTypingActive) {
      this.liveTypingPanelIndex = 0;
      this.updateLiveTypingPanelIndex(0);
    } else {
      this.liveTypingPanelIndex = null;
      this.updateLiveTypingPanelIndex(null);
    }
  }
}
