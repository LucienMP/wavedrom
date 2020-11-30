'use strict';

var process = require('./process');

function processAll () {
    var points,
        i,
        value,
        element,
        node;

    points = document.querySelectorAll('*[type=WaveDrom]');
    for (i = 0; i < points.length; i++) {
        element = points.item(i);
        if (element.type === 'textarea') {
            value = element.value;
        } else {
            value = element.innerHTML;
        }

        node = document.createElement('div');
        element.parentNode.insertBefore(node, element);
        process(node, value);
    }
}

module.exports = processAll;

/* eslint-env browser */
