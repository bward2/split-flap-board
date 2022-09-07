import { bottomAnimations, topAnimations } from './boardManager.js';
import { testButtonFlip, testButtonReset } from './constants.js';

testButtonFlip.onclick = () => {
  topAnimations.forEach((animation) => {
    animation.play();
  });
  bottomAnimations.forEach((animation) => {
    animation.play();
  });
};

testButtonReset.onclick = () => {
  console.log('Reset!');
};
