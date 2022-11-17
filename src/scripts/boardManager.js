import { boardColumns, boardRows, panelCharacters } from './constants.js';
import { PanelManager } from './panelManager.js';
import { testPatterns } from './testPatterns.js';
import { InputManager } from './inputManager.js';

export class BoardManager {
  constructor(panelSize, theme) {
    this.panels = [];
    this.panelSize = panelSize;
    this.theme = theme;
    this.panelsRequestingSound = [];
    this.maxPanelsAllowedToPlaySound = 50;
    this.liveTypingPanelIndex = null;

    this.currentTestPattern = 0;

    this.populateBoard();

    this.inputManager = new InputManager(
      this.setLiveTypingPanelIndex.bind(this)
    );
  }

  handleRequestToStartPlayingSound(panelIndex) {
    if (this.panelsRequestingSound.includes(panelIndex)) {
      return;
    }

    this.panelsRequestingSound.push(panelIndex);
  }

  handleRequestToStopPlayingSound(panelIndex) {
    if (!this.panelsRequestingSound.includes(panelIndex)) {
      return;
    }

    this.panelsRequestingSound.splice(
      this.panelsRequestingSound.indexOf(panelIndex),
      1
    );
  }

  getPanelsAllowedToPlaySound() {
    const finalPanelIndex = Math.min(
      this.maxPanelsAllowedToPlaySound,
      this.panelsRequestingSound.length
    );
    return this.panelsRequestingSound.slice(0, finalPanelIndex);
  }

  populateBoard() {
    const board = document.getElementById('split-flap-board');
    let currentPanelIndex = 0;
    for (let rowIndex = 0; rowIndex < boardRows; rowIndex += 1) {
      let newBoardRow = document.createElement('div');
      newBoardRow.classList.add('split-flap-row');

      for (let columnIndex = 0; columnIndex < boardColumns; columnIndex += 1) {
        let panelOuterContainer = document.createElement('div');
        panelOuterContainer.classList.add('split-flap-panel-outer-container');

        const panel = new PanelManager(
          this.panelSize,
          this.theme,
          currentPanelIndex,
          this.handleRequestToStartPlayingSound.bind(this),
          this.handleRequestToStopPlayingSound.bind(this)
        );
        this.panels.push(panel);

        panelOuterContainer.appendChild(panel.getContainer());
        newBoardRow.appendChild(panelOuterContainer);
        currentPanelIndex += 1;
      }

      board.appendChild(newBoardRow);
    }
  }

  getPanels() {
    return this.panels;
  }

  setTheme(theme) {
    this.theme = theme;

    this.panels.forEach((panel) => {
      panel.setTheme(this.theme);
    });
  }

  setPanelSize(newPanelSize) {
    this.panelSize = newPanelSize;

    this.panels.forEach((panel) => {
      panel.setPanelSize(this.panelSize);
    });
  }

  setLiveTypingPanelIndex(newIndex) {
    if (this.liveTypingPanelIndex !== null) {
      this.panels[this.liveTypingPanelIndex].flip(newIndex);
      const oldTargetContainer =
        this.panels[this.liveTypingPanelIndex].getOuterContainer();
      oldTargetContainer.classList.remove('live-typing-outline');
    }

    this.liveTypingPanelIndex = newIndex;
    const newTargetContainer = this.panels[newIndex].getOuterContainer();
    newTargetContainer.classList.add('live-typing-outline');
  }

  //TODO: Remove these test methods once they are no longer needed
  flipAllPanels() {
    this.currentTestPattern += 1;

    if (this.currentTestPattern >= testPatterns.length) {
      this.currentTestPattern = 0;
    }

    testPatterns[this.currentTestPattern].forEach(
      (character, currentPanelIndex) => {
        let targetIndex = panelCharacters.indexOf(character);

        if (targetIndex === -1) {
          targetIndex = 0;
        }

        this.panels[currentPanelIndex].flip(targetIndex);
      }
    );
  }

  resetAllPanels() {
    this.panels.forEach((panel) => {
      panel.reset();
    });
  }
}
