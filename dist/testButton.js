"use strict";
var testButton = document.getElementById('test-button');
var topHalfFlaps = document.querySelectorAll('.top-half');
var bottomHalfFlaps = document.querySelectorAll('.bottom-half');
testButton.onclick = function () {
    for (var index = 0; index < topHalfFlaps.length; index++) {
        topHalfFlaps[index].classList.add('top-half-flip');
        bottomHalfFlaps[index].classList.add('bottom-half-flip');
    }
};
