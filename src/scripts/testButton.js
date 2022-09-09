import { bottomAnimations, topAnimations } from './boardManager.js';
import { testButtonFlip, testButtonReset } from './constants.js';

let blah = 0;

testButtonFlip.onclick = () => {
  topAnimations.forEach((animation) => {
    animation[blah].play();
  });
  bottomAnimations.forEach((animation) => {
    animation[blah].play();
  });

  blah += 1;
};

testButtonReset.onclick = () => {
  console.log('Reset!');
};
