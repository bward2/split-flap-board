"use strict";
var testButton = document.getElementById('test-button');
var topFullFlaps = document.querySelectorAll('.top-full');
var topHalfFlaps = document.querySelectorAll('.top-half');
var bottomHalfFlaps = document.querySelectorAll('.bottom-half');
var bottomFullFlaps = document.querySelectorAll('.bottom-full');
var panelCharacters = ['', 'A', 'B', 'C', '1', '2', '3'];
var flipSpeed = 0.25;
for (var index = 0; index < topFullFlaps.length; index++) {
    var topHalfFlap = topHalfFlaps[index];
    var bottomHalfFlap = bottomHalfFlaps[index];
    topHalfFlap.style.animationDuration = "".concat(flipSpeed, "s");
    bottomHalfFlap.style.animationDuration = "".concat(flipSpeed, "s");
}
testButton.onclick = function () {
    var _loop_1 = function (index) {
        topHalfFlaps[index].classList.add('top-half-flip');
        bottomHalfFlaps[index].classList.add('bottom-half-flip');
        setTimeout(function () {
            var current = panelCharacters.indexOf(topFullFlaps[index].innerHTML);
            var next = current === panelCharacters.length - 1 ? 0 : current + 1;
            topFullFlaps[index].innerHTML = panelCharacters[next];
            topHalfFlaps[index].innerHTML = panelCharacters[current];
            bottomHalfFlaps[index].innerHTML = panelCharacters[next];
            bottomFullFlaps[index].innerHTML = panelCharacters[current];
            topHalfFlaps[index].classList.remove('top-half-flip');
            bottomHalfFlaps[index].classList.remove('bottom-half-flip');
        }, flipSpeed * 1000);
    };
    for (var index = 0; index < topFullFlaps.length; index++) {
        _loop_1(index);
    }
};
