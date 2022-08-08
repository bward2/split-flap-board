const testButton = document.getElementById('test-button') as HTMLButtonElement;

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
  const topFullFlap = topFullFlaps[index] as HTMLElement;
  const topHalfFlap = topHalfFlaps[index] as HTMLElement;
  const bottomHalfFlap = bottomHalfFlaps[index] as HTMLElement;
  const bottomFullFlap = bottomFullFlaps[index] as HTMLElement;

  topFullFlap.style.animationDuration = `${flipSpeed}s`;
  topHalfFlap.style.animationDuration = `${flipSpeed}s`;
  bottomHalfFlap.style.animationDuration = `${flipSpeed}s`;
  bottomFullFlap.style.animationDuration = `${flipSpeed}s`;
}

const flipThem = () => {
  for (let index = 0; index < topFullFlaps.length; index++) {
    const topFullFlap = topFullFlaps[index] as HTMLElement;
    const topHalfFlap = topHalfFlaps[index] as HTMLElement;
    const bottomHalfFlap = bottomHalfFlaps[index] as HTMLElement;
    const bottomFullFlap = bottomFullFlaps[index] as HTMLElement;

    topFullFlaps[index].classList.remove('top-full-slide');
    topHalfFlaps[index].classList.remove('top-half-flip');
    bottomHalfFlaps[index].classList.remove('bottom-half-flip');

    void topFullFlap.offsetWidth;
    void topHalfFlap.offsetWidth;
    void bottomHalfFlap.offsetWidth;

    topFullFlaps[index].classList.add('top-full-slide');
    topHalfFlaps[index].classList.add('top-half-flip');
    bottomHalfFlaps[index].classList.add('bottom-half-flip');

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
