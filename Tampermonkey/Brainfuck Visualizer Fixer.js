// ==UserScript==
// @name         Brainfuck Visualizer Fixer
// @namespace    http://tampermonkey.net/
// @version      2025-07-12
// @description  Fixes delay in visualizer
// @author       Emeteil
// @match        https://ashupk.github.io/Brainfuck/brainfuck-visualizer-master/index.html
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const delaySlider = document.getElementById("delay");
    delaySlider.step = 5;
    delaySlider.min = 0;
})();