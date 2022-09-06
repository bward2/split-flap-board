import { testButtonFlip, testButtonReset } from './constants.js';

testButtonFlip.onclick = () => {
  console.log('Flip!');
};

testButtonReset.onclick = () => {
  console.log('Reset!');
};
