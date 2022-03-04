{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Feb 15 09:34:48 PST 2022
// Last Modified: Tue Feb 15 09:34:51 PST 2022
// Filename:      _includes/shared/ClearWaitingCursor.js
// Used by:       _includes/work/displayWorkInfo.js
// Included in:   _includes/shared/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Reverse "last, first" for Names.
//
{% endcomment %}

POPC2.prototype.ClearWaitingCursor = function (name) {
	this.DebugMessageFunctionVerbose(name);
	document.body.classList.remove("waiting")
};

Object.defineProperty(POPC2.prototype.ClearWaitingCursor, "name", { value: "ClearWaitingCursor" });



