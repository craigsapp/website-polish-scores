{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Oct 17 08:54:36 PDT 2021
// Last Modified: Sun Oct 17 08:54:39 PDT 2021
// Filename:      _includes/shared/ActivateNotationUpdates.js
// Used by:       _includes/shared/ShowPage.js
// Included in:   _includes/shared/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Restart updating the SVG notation on the webpage
//                (usually because it was deactivated because the
//                work page is not being displayed).
//
{% endcomment %}

POPC2.prototype.ActivateNotationUpdates = function () {
	this.DebugMessageFunction();
	let element = document.querySelector("#humdrum-deactivated");
	if (element) {
		element.id = "humdrum";
	}
};

Object.defineProperty(POPC2.prototype.ActivateNotationUpdates, "name", { value: "ActivateNotationUpdates" });



