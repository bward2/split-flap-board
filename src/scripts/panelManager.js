import { flipSpeed, framesPerFlip } from './constants.js';

export class PanelManager {
  constructor(panelSize) {
    this.msBetweenSprites = flipSpeed / framesPerFlip;
    this.msSinceLastSprite = 0;
    this.spriteFrames = framesPerFlip;
    this.framesThisFlip = 0;
    this.characterIndex = 0;
    this.panelSize = panelSize;
    this.animating = false;

    this.container = document.createElement('div');
    this.container.classList.add('split-flap-panel-container');
    this.container.style.backgroundImage =
      'url(./src/assets/images/darkThemeSpritesheet.png)';

    this.animationTarget = document.createElement('img');
    this.animationTarget.classList.add('split-flap-panel');
    this.animationTarget.loading = 'lazy';
    this.animationTarget.src = './src/assets/images/darkThemeSpritesheet.png';

    this.container.appendChild(this.animationTarget);
  }

  getContainer() {
    return this.container;
  }

  setPanelSize(newPanelSize) {
    this.panelSize = newPanelSize;
  }

  flip() {
    this.framesThisFlip = 0;
    this.animating = true;
  }

  draw() {
    this.animationTarget.style.transform = `translate(-${
      this.framesThisFlip * this.panelSize
    }px, -${this.characterIndex * this.panelSize * 1.05}px)`;

    if (!this.animating) {
      return;
    }

    const readyForNextFrame = this.msSinceLastSprite > this.msBetweenSprites;

    if (readyForNextFrame) {
      if (this.framesThisFlip < framesPerFlip - 1) {
        this.framesThisFlip += 1;
      } else {
        this.framesThisFlip = 0;
        this.characterIndex += 1;
        this.animating = false;
      }
      this.msSinceLastSprite = 0;
    }
  }

  update(elapsedMs) {
    this.msSinceLastSprite += elapsedMs;
  }
}
