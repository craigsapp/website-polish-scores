{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:29:12 PDT 2021
// Last Modified: Wed Oct  6 12:29:15 PDT 2021
// Filename:      _includes/shared/CopyToClipboard.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Copy text to the system clipboard.
//
{% endcomment %}

POPC2.prototype.CopyToClipboard = function (string) {
	this.DebugMessageFunction(string);
	let element = document.createElement("textarea");
	element.value = string;
	document.body.appendChild(element);
	element.select();
	document.execCommand("copy");
	document.body.removeChild(element);
};



