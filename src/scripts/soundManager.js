import { sounds } from './constants.js';

export class SoundManager {
  constructor() {
    this.flipSounds = [];
    this.flapSounds = [];
    this.variationsPerSound = 10;

    this.init();
  }

  init() {
    Howler.volume(0.1);
    for (let index = 1; index <= this.variationsPerSound; index += 1) {
      var flipSound = new Howl({
        src: [`src/assets/audio/flip/${index}.mp3`],
      });
      this.flipSounds.push(flipSound);

      var flapSound = new Howl({
        src: [`src/assets/audio/flap/${index}.mp3`],
      });
      this.flapSounds.push(flapSound);
    }
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  playSound(name, numberOfPanelsRequestingSound) {
    Howler.volume(1 / numberOfPanelsRequestingSound);
    const random = this.getRandomInt(0, this.variationsPerSound - 1);
    const targetCollection =
      name === sounds.FLIP ? this.flipSounds : this.flapSounds;
    const sound = targetCollection[random];

    sound.play();
  }
}
