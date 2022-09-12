import { testButtonFlip, testButtonReset } from './constants.js';
import { AnimationEngine } from './animationEngine.js';
import { PanelManager } from './panelManager.js';

class PageManager {
  constructor() {
    this.maxFps = 360;
    this.panels = [];

    const board = document.getElementById('split-flap-board');
    const panel = new PanelManager();
    this.panels.push(panel);
    board.appendChild(panel.getContainer());

    this.animationEngine = new AnimationEngine(this.maxFps, this.panels);
    this.animationEngine.start();

    testButtonFlip.onclick = () => {
      this.panels.forEach((panel) => {
        console.log(panel);
        panel.flip();
      });
    };

    testButtonReset.onclick = () => {
      console.log('Reset!');
    };
  }
}

const pageManager = new PageManager();
