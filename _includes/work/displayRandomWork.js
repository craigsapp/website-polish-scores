{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Thu Oct 21 00:32:51 PDT 2021
// Last Modified: Wed Apr 12 15:25:54 PDT 2023
// Filename:      _includes/work/displayRandomWork.js
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Choose a random work to display.
//
{% endcomment %}

POPC2.prototype.displayRandomWork = function () {
	this.DebugMessageFunction();

	if (this.IsWorkPage()) {
		// Already viewing a work, so do not need
		// to first display the work page.
		this.displayScore("random");
	} else {
		this.displayWorkPage("random");
	}
};

Object.defineProperty(POPC2.prototype.displayRandomWork, "name", { value: "displayRandomWork" });



