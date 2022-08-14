const testButtonFlip = document.getElementById('test-button-flip');
const testButtonReset = document.getElementById('test-button-reset');

const topFullFlaps = document.querySelectorAll('.top-full');
const topHalfFlaps = document.querySelectorAll('.top-half');
const bottomHalfFlaps = document.querySelectorAll('.bottom-half');
const bottomFullFlaps = document.querySelectorAll('.bottom-full');

const panelCharacters = [
  '',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
];
const flipSpeed = 0.05;

for (let index = 0; index < topFullFlaps.length; index++) {
  const topFullFlap = topFullFlaps[index];
  const topHalfFlap = topHalfFlaps[index];
  const bottomHalfFlap = bottomHalfFlaps[index];
  const bottomFullFlap = bottomFullFlaps[index];

  topFullFlap.style.animationDuration = `${flipSpeed}s`;
  topHalfFlap.style.animationDuration = `${flipSpeed}s`;
  bottomHalfFlap.style.animationDuration = `${flipSpeed}s`;
  bottomFullFlap.style.animationDuration = `${flipSpeed}s`;
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

const playSound = (min, max, name) => {
  const random = getRandomInt(min, max);

  var sound = new Howl({
    src: [`src/assets/audio/${name}/${random}.mp3`],
  });

  sound.play();
};

/**
 *
 * @param {Boolean} flipOnce
 */
const flipThem = (flipOnce) => {
  for (let index = 0; index < topFullFlaps.length; index++) {
    const topFullFlap = topFullFlaps[index];
    const topHalfFlap = topHalfFlaps[index];
    const bottomHalfFlap = bottomHalfFlaps[index];
    const bottomFullFlap = bottomFullFlaps[index];

    topFullFlaps[index].classList.remove('top-full-slide');
    topHalfFlaps[index].classList.remove('top-half-flip');
    bottomHalfFlaps[index].classList.remove('bottom-half-flip');

    void topFullFlap.offsetWidth;
    void topHalfFlap.offsetWidth;
    void bottomHalfFlap.offsetWidth;

    topFullFlaps[index].classList.add('top-full-slide');
    topHalfFlaps[index].classList.add('top-half-flip');
    bottomHalfFlaps[index].classList.add('bottom-half-flip');

    // playSound(1, 1, 'test');
    playSound(1, 11, 'blahStart');
    // playSound(1, 5, 'flip');

    setTimeout(() => {
      playSound(1, 11, 'blahEnd');
      // playSound(1, 6, 'slap');

      const current = panelCharacters.indexOf(topFullFlaps[index].innerHTML);
      const next = current === panelCharacters.length - 1 ? 0 : current + 1;

      topFullFlaps[index].innerHTML = panelCharacters[next];
      topHalfFlaps[index].innerHTML = panelCharacters[current];
      bottomHalfFlaps[index].innerHTML = panelCharacters[next];
      bottomFullFlaps[index].innerHTML = panelCharacters[current];

      topFullFlaps[index].classList.remove('top-full-slide');
      topHalfFlaps[index].classList.remove('top-half-flip');
      bottomHalfFlaps[index].classList.remove('bottom-half-flip');

      if (flipOnce) {
        testButtonFlip.disabled = false;

        bottomFullFlaps[index].classList.remove('bottom-full-bounce');
        void bottomFullFlap.offsetWidth;
        bottomFullFlaps[index].classList.add('bottom-full-bounce');
      } else {
        if (current === 0) {
          testButtonFlip.disabled = false;
          testButtonReset.disabled = false;

          bottomFullFlaps[index].classList.remove('bottom-full-bounce');
          void bottomFullFlap.offsetWidth;
          bottomFullFlaps[index].classList.add('bottom-full-bounce');
        } else {
          flipThem(false);
        }
      }
    }, flipSpeed * 1000);
  }
};

testButtonFlip.onclick = () => {
  testButtonFlip.disabled = true;
  flipThem(true);
};

testButtonReset.onclick = () => {
  testButtonFlip.disabled = true;
  testButtonReset.disabled = true;
  flipThem(false);
};
