const testButton = document.getElementById('test-button') as HTMLElement;

const topFullFlaps = document.querySelectorAll('.top-full');
const topHalfFlaps = document.querySelectorAll('.top-half');
const bottomHalfFlaps = document.querySelectorAll('.bottom-half');
const bottomFullFlaps = document.querySelectorAll('.bottom-full');

const panelCharacters = ['', 'A', 'B', 'C', '1', '2', '3'];

testButton.onclick = () => {
  for (let index = 0; index < topHalfFlaps.length; index++) {
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
    }, 1000);
  }
};
