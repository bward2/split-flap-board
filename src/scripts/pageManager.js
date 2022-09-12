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
  }
}

const pageManager = new PageManager();
