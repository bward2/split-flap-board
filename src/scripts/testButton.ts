const testButton = document.getElementById('test-button') as HTMLElement;

const topFullFlaps = document.querySelectorAll(
  '.top-full'
) as NodeListOf<HTMLElement>;
const topHalfFlaps = document.querySelectorAll(
  '.top-half'
) as NodeListOf<HTMLElement>;
const bottomHalfFlaps = document.querySelectorAll(
  '.bottom-half'
) as NodeListOf<HTMLElement>;
const bottomFullFlaps = document.querySelectorAll(
  '.bottom-full'
) as NodeListOf<HTMLElement>;

const panelCharacters = ['', 'A', 'B', 'C', '1', '2', '3'];
const flipSpeed = 0.25;

for (let index = 0; index < topFullFlaps.length; index++) {
  topHalfFlaps[index].style.animationDuration = `${flipSpeed}s`;
  bottomHalfFlaps[index].style.animationDuration = `${flipSpeed}s`;
}

testButton.onclick = () => {
  for (let index = 0; index < topFullFlaps.length; index++) {
    topHalfFlaps[index].classList.add('top-half-flip');
    bottomHalfFlaps[index].classList.add('bottom-half-flip');

    setTimeout(() => {
      const current = panelCharacters.indexOf(topFullFlaps[index].innerHTML);
      const next = current === panelCharacters.length - 1 ? 0 : current + 1;

      console.log(current, next);

      topFullFlaps[index].innerHTML = panelCharacters[next];
      topHalfFlaps[index].innerHTML = panelCharacters[current];
      bottomHalfFlaps[index].innerHTML = panelCharacters[next];
      bottomFullFlaps[index].innerHTML = panelCharacters[current];

      topHalfFlaps[index].classList.remove('top-half-flip');
      bottomHalfFlaps[index].classList.remove('bottom-half-flip');
    }, flipSpeed * 1000);
  }
};
