'use strict';

function eva (value) {
    var source;

    function erra (e) {
        return { signal: [{ name: ['tspan', ['tspan', {class:'error h5'}, 'Error: '], e.message] }]};
    }

    // Backward compatible code, converts javascript object definition style to JSON
    // wrap property name with quotes { name : .... } ---> { "name" : .... }
    value = value.replaceAll( /(\s*[{,]\s*)(\w+)(\s*:\s*)/g, '$1"$2"$3' );
    // replace apostrophes with quites for property name
    value = value.replaceAll( /(\s*[{,]\s*)'((?:[^']|\\')*)'(\s*:\s*)/g, '$1"$2"$3' );
    // replace apostrophes with quites for values  { "name" : 'value' } ---> { "name" : "value" }
    value = value.replaceAll( /([[:,]\s*)'((?:[^']|\\')*)'/g, '$1"$2"' );
    // remove unexpected commas
    value = value.replaceAll( /(["}\d]\s*),(\s*[\]}])/g, '$1$2' );
    // replace values like .5 with 0.5
    value = value.replaceAll( /([[:,]\s*)\.(\d+)/g, '$10.$2' );

    try {
        source = JSON.parse(value);
    } catch (e) {
        return erra(e);
    }

    if (typeof source !== 'object') {
        return erra({ message : '[Semantic]: The root has to be an Object: "{signal:[...]}"'});
    }
    if (source.signal) {
        if (!Array.isArray(source.signal)) {
            return erra({ message: '[Semantic]: "signal" object has to be an Array "signal:[]"'});
        }
    } else if (source.assign) {
        if (!Array.isArray(source.assign)) {
            return erra({ message: '[Semantic]: "assign" object hasto be an Array "assign:[]"'});
        }
    } else if (source.reg) {
        // test register
    } else {
        return erra({ message: '[Semantic]: "signal:[...]" or "assign:[...]" property is missing inside the root Object'});
    }
    return source;
}

module.exports = eva;

/* eslint-env browser */
