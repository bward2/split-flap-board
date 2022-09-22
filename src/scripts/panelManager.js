import {
  flipAnimationDurationInMilliseconds,
  framesPerFlipAnimation,
} from './constants.js';

export class PanelManager {
  constructor(panelSize) {
    this.msBetweenSprites =
      flipAnimationDurationInMilliseconds / framesPerFlipAnimation;
    this.msSinceFlipAnimationBegan = 0;
    this.characterIndex = 0;
    this.panelSize = panelSize;
    this.animating = false;

    this.container = document.createElement('div');
    this.container.classList.add('split-flap-panel-container');

    this.animationTarget = document.createElement('img');
    this.animationTarget.classList.add('split-flap-panel');
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
    if (this.animating) {
      return;
    }

    this.animating = true;
  }

  determineFrameToDisplay() {
    console.log(framesPerFlipAnimation);

    return Math.min(
      Math.floor(this.msSinceFlipAnimationBegan / this.msBetweenSprites),
      framesPerFlipAnimation - 1
    );
  }

  draw() {
    this.animationTarget.style.transform = `translate(-${
      this.determineFrameToDisplay() * this.panelSize
    }px, -${this.characterIndex * this.panelSize * 1.05}px)`;

    if (this.msSinceFlipAnimationBegan > flipAnimationDurationInMilliseconds) {
      this.animating = false;
      this.msSinceFlipAnimationBegan = 0;
      this.characterIndex += 1;
    }
  }

  update(elapsedMs) {
    if (this.animating) {
      this.msSinceFlipAnimationBegan += elapsedMs;
    }
  }
}
