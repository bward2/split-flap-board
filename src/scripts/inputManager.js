export class InputManager {
  constructor(updateLiveTypingPanelIndex) {
    this.updateLiveTypingPanelIndex = updateLiveTypingPanelIndex;
    this.liveTypingActive = false;
  }

  toggleLiveTyping() {
    this.liveTypingActive = !this.liveTypingActive;

    if (this.liveTypingActive) {
      this.updateLiveTypingPanelIndex(0);
    } else {
      this.updateLiveTypingPanelIndex(null);
    }
  }
}
