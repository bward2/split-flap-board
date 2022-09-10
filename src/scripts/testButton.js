import { sounds, testButtonFlip, testButtonReset } from './constants.js';
import { playSound } from './soundManager.js';

const animatePanel = (panel, index) => {
  const animation = panel.animate(
    [{ transform: 'translateX(0)' }, { transform: 'translateX(-900px)' }],
    {
      fill: 'forwards',
      easing: 'steps(9)',
      duration: 1000,
    }
  );
};

testButtonFlip.onclick = () => {
  const panels = document.querySelectorAll('.split-flap-panel');
  panels.forEach((panel, index) => {
    animatePanel(panel, index);
  });
};

testButtonReset.onclick = () => {
  console.log('Reset!');
};
