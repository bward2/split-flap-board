import { flipSpeed, framesPerFlip } from './constants.js';

export class PanelManager {
  constructor(panelSize) {
    this.msBetweenSprites = flipSpeed / framesPerFlip;
    this.msSinceLastSprite = 0;
    this.spriteFrames = framesPerFlip;
    this.frameIndex = 0;
    this.panelSize = panelSize;
    this.animating = false;

    this.container = document.createElement('div');
    this.container.classList.add('split-flap-panel-container');

    this.animationTarget = document.createElement('img');
    this.animationTarget.classList.add('split-flap-panel');
    this.animationTarget.src = './src/assets/images/paintDotNetTest.png';

    this.container.appendChild(this.animationTarget);
  }

  getContainer() {
    return this.container;
  }

  setPanelSize(newPanelSize) {
    this.panelSize = newPanelSize;
  }

  flip() {
    this.frameIndex = 0;
    this.animating = true;
  }

  draw() {
    this.animationTarget.style.transform = `translateX(-${
      this.frameIndex * this.panelSize
    }px)`;

    if (!this.animating) {
      return;
    }

    const readyForNextFrame = this.msSinceLastSprite > this.msBetweenSprites;

    if (readyForNextFrame) {
      if (this.frameIndex < 10) {
        this.frameIndex += 1;
      } else {
        this.animating = false;
      }
      this.msSinceLastSprite = 0;
    }
  }

  update(elapsedMs) {
    this.msSinceLastSprite += elapsedMs;
  }
}
