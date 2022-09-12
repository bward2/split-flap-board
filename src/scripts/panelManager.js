import { flipSpeed, framesPerFlip } from './constants.js';

export class PanelManager {
  constructor() {
    this.msBetweenSprites = flipSpeed / framesPerFlip;
    this.msSinceLastSprite = 0;
    this.spriteFrames = framesPerFlip;
    this.translatedPixels = 0;
    this.animating = false;

    this.container = document.createElement('div');
    this.container.classList.add('split-flap-panel-container');

    this.animationTarget = document.createElement('img');
    this.animationTarget.classList.add('split-flap-panel');
    this.animationTarget.src = './src/assets/images/frameTest.png';

    this.container.appendChild(this.animationTarget);
  }

  getContainer() {
    return this.container;
  }

  flip() {
    this.translatedPixels = 0;
    this.animating = true;
  }

  draw() {
    if (!this.animating) {
      return;
    }

    const readyForNextFrame = this.msSinceLastSprite > this.msBetweenSprites;

    if (readyForNextFrame) {
      this.animationTarget.style.transform = `translateX(-${this.translatedPixels}px)`;
      if (this.translatedPixels !== 1000) {
        this.translatedPixels += 100;
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
