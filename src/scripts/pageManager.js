import { testButtonFlip, testButtonReset, themeSwitch } from './constants.js';
import { AnimationEngine } from './animationEngine.js';
import { ThemeManager } from './themeManager.js';
import { BoardManager } from './boardManager.js';

class PageManager {
  constructor() {
    this.maxFps = 360;

    this.themeManager = new ThemeManager();
    this.theme = this.themeManager.loadTheme();

    this.setPanelSize(this.calculatePanelSize());

    this.boardManager = new BoardManager(this.panelSize, this.theme);

    this.animationEngine = new AnimationEngine(
      this.maxFps,
      this.boardManager.getPanels()
    );
    this.animationEngine.start();

    this.registerEventListeners();
    this.registerOnClickHandlers();
  }

  registerEventListeners() {
    addEventListener('resize', () => {
      this.setPanelSize(this.calculatePanelSize());
      this.boardManager.setPanelSize(this.panelSize);
    });
  }

  registerOnClickHandlers() {
    themeSwitch.onclick = () => {
      this.theme = this.themeManager.toggleTheme();
      this.boardManager.setTheme(this.theme);
    };

    testButtonFlip.onclick = () => {
      this.boardManager.flipAllPanels();
    };

    testButtonReset.onclick = () => {
      this.boardManager.resetAllPanels();
    };
  }

  calculatePanelSize() {
    return ((window.innerWidth * 0.9) / 22) * 0.85;
  }

  setPanelSize(newPanelSize) {
    this.panelSize = newPanelSize;
    document.documentElement.style.setProperty(
      '--split-flap-panel-container-width',
      `${this.panelSize}px`
    );
  }
}

const pageManager = new PageManager();
