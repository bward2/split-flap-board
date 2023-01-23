import {
  boardColumns,
  events,
  testButtonFlip,
  themeSwitch,
} from './constants.js';
import { AnimationEngine } from './animationEngine.js';
import { ThemeManager } from './themeManager.js';
import { BoardManager } from './boardManager.js';
import { SoundManager } from './soundManager.js';

class PageManager {
  constructor() {
    this.maxFps = 360;

    this.soundManager = new SoundManager();

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
    addEventListener('resize', this.handleResize.bind(this));
    addEventListener(
      events.REQUEST_PLAY_SOUND,
      this.handleRequestToPlaySound.bind(this)
    );
  }

  registerOnClickHandlers() {
    themeSwitch.onclick = () => {
      this.theme = this.themeManager.toggleTheme();
      this.boardManager.setTheme(this.theme);
    };

    testButtonFlip.onclick = () => {
      this.boardManager.flipAllPanels();
    };
  }

  handleResize() {
    this.setPanelSize(this.calculatePanelSize());
    this.boardManager.setPanelSize(this.panelSize);
  }

  handleRequestToPlaySound(event) {
    const { sound, panelIndex } = event.detail;
    if (!this.boardManager.getPanelsAllowedToPlaySound().includes(panelIndex)) {
      return;
    }

    this.soundManager.playSound(sound);
  }

  calculatePanelSize() {
    const marginSize = 0.004;
    const boardWidthPercentage = 0.95;
    return (
      (window.innerWidth / boardColumns - window.innerWidth * marginSize) *
      boardWidthPercentage
    );
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
