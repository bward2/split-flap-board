"use strict";
var testButton = document.getElementById('test-button');
var topFullFlaps = document.querySelectorAll('.top-full');
var topHalfFlaps = document.querySelectorAll('.top-half');
var bottomHalfFlaps = document.querySelectorAll('.bottom-half');
var bottomFullFlaps = document.querySelectorAll('.bottom-full');
var panelCharacters = ['', 'A', 'B', 'C', '1', '2', '3'];
testButton.onclick = function () {
    var _loop_1 = function (index) {
        topHalfFlaps[index].classList.add('top-half-flip');
        bottomHalfFlaps[index].classList.add('bottom-half-flip');
        setTimeout(function () {
            var current = panelCharacters.indexOf(topFullFlaps[index].innerHTML);
            var next = current === panelCharacters.length - 1 ? 0 : current + 1;
            console.log(current, next);
            topFullFlaps[index].innerHTML = panelCharacters[next];
            topHalfFlaps[index].innerHTML = panelCharacters[current];
            bottomHalfFlaps[index].innerHTML = panelCharacters[next];
            bottomFullFlaps[index].innerHTML = panelCharacters[current];
            topHalfFlaps[index].classList.remove('top-half-flip');
            bottomHalfFlaps[index].classList.remove('bottom-half-flip');
        }, 400);
    };
    for (var index = 0; index < topHalfFlaps.length; index++) {
        _loop_1(index);
    }
};
