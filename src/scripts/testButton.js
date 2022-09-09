import { testButtonFlip, testButtonReset } from './constants.js';
testButtonFlip.onclick = () => {
  console.log('Test!');
};

testButtonReset.onclick = () => {
  console.log('Reset!');
};
