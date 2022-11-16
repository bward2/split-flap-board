import {
  boardColumns,
  events,
  keyboardContainer,
  showKeyboardButton,
  testButtonFlip,
  testButtonReset,
  themeSwitch,
} from './constants.js';
import { AnimationEngine } from './animationEngine.js';
import { ThemeManager } from './themeManager.js';
import { BoardManager } from './boardManager.js';
import { SoundManager } from './soundManager.js';
import { InputManager } from './inputManager.js';

class PageManager {
  constructor() {
    this.maxFps = 360;
    this.liveTypingPanelIndex = null;

    this.soundManager = new SoundManager();

    this.themeManager = new ThemeManager();
    this.theme = this.themeManager.loadTheme();

    this.setPanelSize(this.calculatePanelSize());

    this.boardManager = new BoardManager(this.panelSize, this.theme);

    this.inputManager = new InputManager(
      this.handleUpdateLiveTypingPanelIndex.bind(this)
    );

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
    showKeyboardButton.onclick = () => {
      showKeyboardButton.style.visibility = 'hidden';
      keyboardContainer.style.visibility = 'visible';

      this.inputManager.toggleLiveTyping();
    };

    for (const keyboardRow of keyboardContainer.children) {
      for (const key of keyboardRow.children) {
        key.addEventListener('click', (event) => {
          console.log(event.target.dataset.key);
        });
      }
    }

    themeSwitch.onclick = () => {
      this.theme = this.themeManager.toggleTheme();
      this.boardManager.setTheme(this.theme);
    };

    // testButtonFlip.onclick = () => {
    //   this.boardManager.flipAllPanels();
    // };

    // testButtonReset.onclick = () => {
    //   this.boardManager.resetAllPanels();
    // };
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

  handleUpdateLiveTypingPanelIndex(newIndex) {
    this.liveTypingPanelIndex = newIndex;
    this.boardManager.setLiveTypingPanelIndex(newIndex);
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
