{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Feb 15 09:34:48 PST 2022
// Last Modified: Tue Feb 15 09:34:51 PST 2022
// Filename:      _includes/shared/ShowWaitingCursor.js
// Used by:       _includes/work/displayWorkInfo.js
// Included in:   _includes/shared/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Reverse "last, first" for Names.
//
{% endcomment %}

POPC2.prototype.ShowWaitingCursor = function (name) {
	this.DebugMessageFunctionVerbose(name);
	requestAnimationFrame(() => {
		document.body.classList.add("waiting")
	});
};

Object.defineProperty(POPC2.prototype.ShowWaitingCursor, "name", { value: "ShowWaitingCursor" });



