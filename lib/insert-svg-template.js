'use strict';

var jsonmlParse = require('./create-element'),
    w3 = require('./w3'),
    waveSkin = require('./wave-skin');

// LMP: Insert style 
function insertSVGStyle( parent, source, lane ) {
    var e, first ;
    
    for (first in waveSkin) { break; }

    // See if the WaveDromSVGStyle
    var doc = document.querySelectorAll('.WaveDromSVGStyle');
    if( doc.length!=0 ) return ;
    
    e = waveSkin.default || waveSkin[first];

    if (source && source.config && source.config.skin && waveSkin[source.config.skin]) {
        e = waveSkin[source.config.skin];
    }

    lane.xs     = Number(e[3][1][2][1].width);
    lane.ys     = Number(e[3][1][2][1].height);
    lane.xlabel = Number(e[3][1][2][1].x);
    lane.ym     = Number(e[3][1][2][1].y);
    
    e[1].id = 'WaveDromSVGStyle';
    e[1].class = 'WaveDromSVGStyle';
    e[1].height = 0;
    
    var head = document.head || document.getElementsByTagName('head')[0] ;
    
    var    node = jsonmlParse(e);
    //parent.insertBefore(node, null);
    //document.head.insertBefore(node, null);
    head.insertBefore(node, null);
    
    var css = 'div.wavedromMenu{position:fixed;border:solid 1pt#CCCCCC;background-color:white;box-shadow:0px 10px 20px #808080;cursor:default;margin:0px;padding:0px;}div.wavedromMenu>ul{margin:0px;padding:0px;}div.wavedromMenu>ul>li{padding:2px 10px;list-style:none;}div.wavedromMenu>ul>li:hover{background-color:#b5d5ff;}';
    var style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet){
	style.styleSheet.cssText = css;
    } else {
	style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
}

function insertSVGTemplate (index, parent, source, lane) {
    var node, first, e;

    // cleanup
    while (parent.childNodes.length) {
        parent.removeChild(parent.childNodes[0]);
    }

    // LMP: Insert style to header only once per page
    insertSVGStyle( parent, source, lane );
    
/* LMP> Shift into style selection function
    for (first in waveSkin) { break; }

    e = waveSkin.default || waveSkin[first];

    if (source && source.config && source.config.skin && waveSkin[source.config.skin]) {
        e = waveSkin[source.config.skin];
    }

    if (index === 0) {
        lane.xs     = Number(e[3][1][2][1].width);
        lane.ys     = Number(e[3][1][2][1].height);
        lane.xlabel = Number(e[3][1][2][1].x);
        lane.ym     = Number(e[3][1][2][1].y);
    } else {
LMP; enable SVG output> */
    if( true ) {
        e = ['svg',
            {
                id: 'svg',
                xmlns: w3.svg,
                'xmlns:xlink': w3.xlink,
                height: '0'
            },
            ['g',
                {
                    id: 'waves'
                },
                ['g', {id: 'lanes'}],
                ['g', {id: 'groups'}]
            ]
        ];
    }

    e[e.length - 1][1].id    = 'waves_'  + index;
    e[e.length - 1][2][1].id = 'lanes_'  + index;
    e[e.length - 1][3][1].id = 'groups_' + index;
    e[1].id = 'svgcontent_' + index;
    e[1].height = 0;

    node = jsonmlParse(e);
    parent.insertBefore(node, null);
}

module.exports = insertSVGTemplate;

/* eslint-env browser */
