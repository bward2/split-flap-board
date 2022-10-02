import {
  boardColumns,
  boardRows,
  testButtonFlip,
  testButtonReset,
  themeSwitch,
} from './constants.js';
import { AnimationEngine } from './animationEngine.js';
import { PanelManager } from './panelManager.js';
import { ThemeManager } from './themeManager.js';

class PageManager {
  constructor() {
    this.maxFps = 360;
    this.panels = [];

    this.setPanelSize();

    this.themeManager = new ThemeManager();
    this.theme = this.themeManager.loadTheme();

    const board = document.getElementById('split-flap-board');
    for (let rowIndex = 0; rowIndex < boardRows; rowIndex += 1) {
      let newBoardRow = document.createElement('div');
      newBoardRow.classList.add('split-flap-row');

      for (let columnIndex = 0; columnIndex < boardColumns; columnIndex += 1) {
        const panel = new PanelManager(this.panelSize, this.theme);
        this.panels.push(panel);
        newBoardRow.appendChild(panel.getContainer());
      }

      board.appendChild(newBoardRow);
    }

    this.animationEngine = new AnimationEngine(this.maxFps, this.panels);
    this.animationEngine.start();

    addEventListener('resize', () => {
      this.setPanelSize();
    });

    themeSwitch.onclick = () => {
      this.theme = this.themeManager.toggleTheme();

      this.panels.forEach((panel) => {
        panel.setTheme(this.theme);
      });
    };

    testButtonFlip.onclick = () => {
      this.panels.forEach((panel) => {
        panel.flip();
      });
    };

    testButtonReset.onclick = () => {
      this.panels.forEach((panel) => {
        panel.reset();
      });
    };
  }

  setPanelSize() {
    this.panelSize = ((window.innerWidth * 0.9) / 22) * 0.85;
    document.documentElement.style.setProperty(
      '--split-flap-panel-container-width',
      `${this.panelSize}px`
    );

    this.panels.forEach((panel) => {
      panel.setPanelSize(this.panelSize);
    });
  }
}

const pageManager = new PageManager();
