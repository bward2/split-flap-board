"use strict";
var testButton = document.getElementById('test-button');
var topFullFlaps = document.querySelectorAll('.top-full');
var topHalfFlaps = document.querySelectorAll('.top-half');
var bottomHalfFlaps = document.querySelectorAll('.bottom-half');
var bottomFullFlaps = document.querySelectorAll('.bottom-full');
var panelCharacters = [
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
var flipSpeed = 0.2;
for (var index = 0; index < topFullFlaps.length; index++) {
    var topFullFlap = topFullFlaps[index];
    var topHalfFlap = topHalfFlaps[index];
    var bottomHalfFlap = bottomHalfFlaps[index];
    var bottomFullFlap = bottomFullFlaps[index];
    topFullFlap.style.animationDuration = "".concat(flipSpeed, "s");
    topHalfFlap.style.animationDuration = "".concat(flipSpeed, "s");
    bottomHalfFlap.style.animationDuration = "".concat(flipSpeed, "s");
    bottomFullFlap.style.animationDuration = "".concat(flipSpeed, "s");
}
var flipThem = function () {
    var _loop_1 = function (index) {
        var topFullFlap = topFullFlaps[index];
        var topHalfFlap = topHalfFlaps[index];
        var bottomHalfFlap = bottomHalfFlaps[index];
        var bottomFullFlap = bottomFullFlaps[index];
        topFullFlaps[index].classList.remove('top-full-slide');
        topHalfFlaps[index].classList.remove('top-half-flip');
        bottomHalfFlaps[index].classList.remove('bottom-half-flip');
        void topFullFlap.offsetWidth;
        void topHalfFlap.offsetWidth;
        void bottomHalfFlap.offsetWidth;
        topFullFlaps[index].classList.add('top-full-slide');
        topHalfFlaps[index].classList.add('top-half-flip');
        bottomHalfFlaps[index].classList.add('bottom-half-flip');
        setTimeout(function () {
            var current = panelCharacters.indexOf(topFullFlaps[index].innerHTML);
            var next = current === panelCharacters.length - 1 ? 0 : current + 1;
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
            }
            else {
                flipThem();
            }
        }, flipSpeed * 1000);
    };
    for (var index = 0; index < topFullFlaps.length; index++) {
        _loop_1(index);
    }
};
testButton.onclick = function () {
    testButton.disabled = true;
    flipThem();
};
