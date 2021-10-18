{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Oct 17 22:03:56 PDT 2021
// Last Modified: Sun Oct 17 22:03:58 PDT 2021
// Filename:      _includes/work/toggleSearchDisplay.js
// Used by:       _includes/navigator/main.html
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle showing of work-level search for music/lyrics.
//
{% endcomment %}

POPC2.prototype.toggleSearchDisplay = function () {
	this.DebugMessageFunction();

	// Hide Download display if visible.

	console.warn("GOING TO SHOW SEARCH FORM");

	this.scrollToTopOfNotation();
};

Object.defineProperty(POPC2.prototype.toggleSearchDisplay, "name", { value: "toggleSearchDisplay" });



