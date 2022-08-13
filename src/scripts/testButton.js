// import { Howl } from './howler.min.js';

const testButton = document.getElementById('test-button');

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
const flipSpeed = 0.2;

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

const flipThem = () => {
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

    var sound = new Howl({
      src: ['src/assets/audio/flip/flip1.mp3'],
    });

    sound.play();

    setTimeout(() => {
      const current = panelCharacters.indexOf(topFullFlaps[index].innerHTML);
      const next = current === panelCharacters.length - 1 ? 0 : current + 1;

      topFullFlaps[index].innerHTML = panelCharacters[next];
      topHalfFlaps[index].innerHTML = panelCharacters[current];
      bottomHalfFlaps[index].innerHTML = panelCharacters[next];
      bottomFullFlaps[index].innerHTML = panelCharacters[current];

      topFullFlaps[index].classList.remove('top-full-slide');
      topHalfFlaps[index].classList.remove('top-half-flip');
      bottomHalfFlaps[index].classList.remove('bottom-half-flip');

      if (current === 2) {
        console.log('Done!');
        testButton.disabled = false;

        bottomFullFlaps[index].classList.remove('bottom-full-bounce');
        void bottomFullFlap.offsetWidth;
        bottomFullFlaps[index].classList.add('bottom-full-bounce');
      } else {
        flipThem();
      }
    }, flipSpeed * 1000);
  }
};

testButton.onclick = () => {
  testButton.disabled = true;
  flipThem();
};
