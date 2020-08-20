import document from "../var/document.js";
import isIE from "../var/isIE.js";
import whitespace from "./var/whitespace.js";

var rbuggyQSA = [],
	testEl = document.createElement( "div" ),
	input = document.createElement( "input" );

// Support: IE 9 - 11+
// IE's :disabled selector does not pick up the children of disabled fieldsets
//////// IE except version 9+, disabled选择器不会选择disabled filedsets的子集
if ( isIE ) {
	rbuggyQSA.push( ":enabled", ":disabled" );
}

// Support: IE 11+, Edge 15 - 18+
// IE 11/Edge don't find elements on a `[name='']` query in some cases.
// Adding a temporary attribute to the document before the selection works
// around the issue.
// Interestingly, IE 10 & older don't seem to have the issue.
//////// IE 11/Edge don't find elements on a `[name='']` query in some cases.验证是否支持[name='']使用创建dom，不加入document中也能querySelectorAll
input.setAttribute( "name", "" );
testEl.appendChild( input );
if ( !testEl.querySelectorAll( "[name='']" ).length ) {
	rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
		whitespace + "*(?:''|\"\")" );
}

rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );

export default rbuggyQSA;
