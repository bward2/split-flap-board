import { boardColumns, boardRows } from './constants.js';
import { PanelManager } from './panelManager.js';

export class BoardManager {
  constructor(panelSize, theme) {
    this.panels = [];
    this.panelSize = panelSize;
    this.theme = theme;
    this.panelsAllowedToPlaySound = [];
    this.maxPanelsAllowedToPlaySound = 10;

    this.populateBoard();
  }

  addToPanelsRequestingSound(panelIndex) {
    if (
      this.panelsAllowedToPlaySound.length < this.maxPanelsAllowedToPlaySound
    ) {
      this.panelsAllowedToPlaySound.push(panelIndex);
    }
  }

  removeFromPanelsRequestingSound(panelIndex) {
    const indexToRemove = this.panelsAllowedToPlaySound.indexOf(panelIndex);
    if (indexToRemove !== -1) {
      this.panelsAllowedToPlaySound.splice(indexToRemove, 1);
    }
  }

  getPanelsAllowedToPlaySound() {
    return this.panelsAllowedToPlaySound;
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
          this.addToPanelsRequestingSound.bind(this),
          this.removeFromPanelsRequestingSound.bind(this)
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
    this.panels.forEach((panel) => {
      panel.flip();
    });
  }

  resetAllPanels() {
    this.panels.forEach((panel) => {
      panel.reset();
    });
  }
}
