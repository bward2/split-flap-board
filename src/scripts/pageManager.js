import { testButtonFlip, testButtonReset } from './constants.js';
import { AnimationEngine } from './animationEngine.js';
import { PanelManager } from './panelManager.js';

class PageManager {
  constructor() {
    this.maxFps = 360;
    this.panels = [];

    this.setPanelSize();

    const board = document.getElementById('split-flap-board');
    for (let i = 0; i < 22; i += 1) {
      const panel = new PanelManager(this.panelSize);
      this.panels.push(panel);
      board.appendChild(panel.getContainer());
    }

    this.animationEngine = new AnimationEngine(this.maxFps, this.panels);
    this.animationEngine.start();

    addEventListener('resize', () => {
      this.setPanelSize();
    });

    testButtonFlip.onclick = () => {
      this.panels.forEach((panel) => {
        panel.flip();
      });
    };

    testButtonReset.onclick = () => {
      console.log('Reset!');
    };
  }

  setPanelSize() {
    this.panelSize = ((window.innerWidth * 0.9) / 18) * 0.85;
    document.documentElement.style.setProperty(
      '--split-flap-panel-container-width',
      `${this.panelSize}px`
    );

    console.log('I did it!');
    this.panels.forEach((panel) => {
      panel.setPanelSize(this.panelSize);
    });
  }
}

const pageManager = new PageManager();
