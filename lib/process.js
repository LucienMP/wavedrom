'use strict';

var eva = require('./eva'),
    appendSaveAsDialog = require('./append-save-as-dialog'),
    renderWaveForm = require('./render-wave-form');

var index = 0;

function process( element, value ) {
    var data = eva(value),
        idPrefix = 'WaveDrom_Display_',
        className = 'wavedrom-output',
        oldOutputNode = element.querySelector('.' + className),
        outputNode;

    index++;
    if ( oldOutputNode ) {
        oldOutputNode.remove();
    }

    outputNode = document.createElement('div');
    outputNode.id = idPrefix + index;
    outputNode.className = className;
    element.append(outputNode);
    renderWaveForm(index, data, idPrefix);
    appendSaveAsDialog(index, idPrefix);
}

module.exports = process;

/* eslint-env browser */
