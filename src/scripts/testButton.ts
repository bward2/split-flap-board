const testButton = document.getElementById('test-button') as HTMLElement;

const topHalfFlaps = document.querySelectorAll('.top-half');
const bottomHalfFlaps = document.querySelectorAll('.bottom-half');

testButton.onclick = () => {
  for (let index = 0; index < topHalfFlaps.length; index++) {
    topHalfFlaps[index].classList.add('top-half-flip');
    bottomHalfFlaps[index].classList.add('bottom-half-flip');
  }
};
