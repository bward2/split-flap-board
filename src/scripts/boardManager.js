import { boardColumns, boardRows, panelCharacters } from './constants.js';
import { PanelManager } from './panelManager.js';
import { testPattern1, testPattern2, testPattern3 } from './testPatterns.js';

export class BoardManager {
  constructor(panelSize, theme) {
    this.panels = [];
    this.panelSize = panelSize;
    this.theme = theme;
    this.panelsRequestingSound = [];
    this.maxPanelsAllowedToPlaySound = 10;

    this.currentTestPattern = 0;

    this.populateBoard();
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
        const panel = new PanelManager(
          this.panelSize,
          this.theme,
          currentPanelIndex,
          this.handleRequestToStartPlayingSound.bind(this),
          this.handleRequestToStopPlayingSound.bind(this)
        );
        this.panels.push(panel);
        newBoardRow.appendChild(panel.getContainer());
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

  //TODO: Remove these test methods once they are no longer needed
  flipAllPanels() {
    this.currentTestPattern += 1;

    if (this.currentTestPattern > 3) {
      this.currentTestPattern = 1;
    }

    let testPattern;
    switch (this.currentTestPattern) {
      case 1:
        testPattern = testPattern1;
        break;
      case 2:
        testPattern = testPattern2;
        break;
      default:
        testPattern = testPattern3;
        break;
    }

    testPattern.forEach((character, currentPanelIndex) => {
      const targetIndex = panelCharacters.indexOf(character);
      this.panels[currentPanelIndex].flip(targetIndex);
    });
  }

  resetAllPanels() {
    this.panels.forEach((panel) => {
      panel.reset();
    });
  }
}
