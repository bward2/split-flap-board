import { sounds } from './constants.js';

const flipSounds = [];
const flapSounds = [];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const playSound = (name) => {
  const random = getRandomInt(0, 9);
  const targetCollection = name === sounds.FLIP ? flipSounds : flapSounds;
  const sound = targetCollection[random];

  sound.play();
};

const init = () => {
  for (let index = 1; index <= 10; index += 1) {
    var flipSound = new Howl({
      src: [`src/assets/audio/flip/${index}.mp3`],
      volume: 0.01, // TODO: Dynamically set volume based on the number of panels in motion.
    });
    flipSounds.push(flipSound);

    var flapSound = new Howl({
      src: [`src/assets/audio/flap/${index}.mp3`],
      volume: 0.01, // TODO: Dynamically set volume based on the number of panels in motion.
    });
    flapSounds.push(flapSound);
  }

  console.log(flipSounds);
};

init();
