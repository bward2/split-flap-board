const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const playSound = (name) => {
  const random = getRandomInt(1, 10);

  var sound = new Howl({
    src: [`src/assets/audio/${name}/${random}.mp3`],
    volume: 0.1, // TODO: Dynamically set volume based on the number of panels in motion.
  });

  sound.play();
};
