import { boardColumns, boardRows } from './constants.js';
import { PanelManager } from './panelManager.js';
import { playSound } from './soundManager.js';

export class BoardManager {
  constructor(panelSize, theme) {
    this.panels = [];
    this.panelSize = panelSize;
    this.theme = theme;
    this.panelsRequestingSound = [];
    this.maxSoundEffects = 10;

    this.populateBoard();
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
          currentPanelIndex
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

  handleRequestToPlaySound(event) {
    const { sound, panelIndex } = event.detail;
    playSound(sound);

    // TODO: Update this to add and remove panels as needed
    // if (this.panelsRequestingSound.length < this.maxSoundEffects) {
    //   this.panelsRequestingSound.push(panelIndex);
    // }

    // if (this.panelsRequestingSound.includes(panelIndex)) {
    //   playSound(sound);
    // }
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
