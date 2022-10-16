import {
  events,
  flipAnimationDurationInMilliseconds,
  framesPerFlipAnimation,
  panelCharacters,
  sounds,
} from './constants.js';

export class PanelManager {
  constructor(
    panelSize,
    theme,
    panelIndex,
    startRequestingToPlaySound,
    stopRequestingToPlaySound
  ) {
    this.msBetweenSprites =
      flipAnimationDurationInMilliseconds / framesPerFlipAnimation;
    this.msSinceFlipAnimationBegan = 0;
    this.targetCharacterIndex = 0;
    this.characterIndex = 0;
    this.panelSize = panelSize;
    this.animating = false;
    this.panelIndex = panelIndex;
    this.startRequestingToPlaySound = startRequestingToPlaySound;
    this.stopRequestingToPlaySound = stopRequestingToPlaySound;

    this.container = document.createElement('div');
    this.container.classList.add('split-flap-panel-container');

    this.animationTarget = document.createElement('img');
    this.animationTarget.classList.add('split-flap-panel');
    this.animationTarget.src = `./src/assets/images/${theme}ThemeSpritesheet.png`;

    this.container.appendChild(this.animationTarget);
  }

  getContainer() {
    return this.container;
  }

  setPanelSize(newPanelSize) {
    this.panelSize = newPanelSize;
  }

  setTheme(newTheme) {
    this.animationTarget.src = `./src/assets/images/${newTheme}ThemeSpritesheet.png`;
  }

  flip(newTargetCharacterIndex) {
    this.targetCharacterIndex = newTargetCharacterIndex;
  }

  reset() {
    this.targetCharacterIndex = 0;

    // this.startRequestingToPlaySound(this.panelIndex);
    // this.animating = true;
  }

  determineFrameToDisplay() {
    return Math.min(
      Math.floor(this.msSinceFlipAnimationBegan / this.msBetweenSprites),
      framesPerFlipAnimation - 1
    );
  }

  advanceIndex(index) {
    if (index === panelCharacters.length - 1) {
      return 0;
    } else {
      return index + 1;
    }
  }

  draw() {
    this.animationTarget.style.transform = `translate(-${
      this.determineFrameToDisplay() * this.panelSize
    }px, -${this.characterIndex * this.panelSize * 1.05}px)`;
  }

  update(elapsedMs) {
    if (this.characterIndex !== this.targetCharacterIndex && !this.animating) {
      this.startRequestingToPlaySound(this.panelIndex);
      this.animating = true;
    }

    if (this.animating) {
      if (this.msSinceFlipAnimationBegan === 0) {
        window.dispatchEvent(
          new CustomEvent(events.REQUEST_PLAY_SOUND, {
            detail: { sound: sounds.FLIP, panelIndex: this.panelIndex },
          })
        );
      }

      this.msSinceFlipAnimationBegan += elapsedMs;

      if (
        this.msSinceFlipAnimationBegan > flipAnimationDurationInMilliseconds
      ) {
        window.dispatchEvent(
          new CustomEvent(events.REQUEST_PLAY_SOUND, {
            detail: { sound: sounds.FLAP, panelIndex: this.panelIndex },
          })
        );
        this.characterIndex = this.advanceIndex(this.characterIndex);
        this.msSinceFlipAnimationBegan = 0;

        if (this.characterIndex === this.targetCharacterIndex) {
          this.stopRequestingToPlaySound(this.panelIndex);
          this.animating = false;
        }
      }
    }
  }
}
