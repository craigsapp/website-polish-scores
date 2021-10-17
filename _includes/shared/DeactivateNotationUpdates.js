{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Oct 17 08:44:54 PDT 2021
// Last Modified: Sun Oct 17 08:44:57 PDT 2021
// Filename:      _includes/shared/DeactivateNotationUpdates.js
// Used by:       _includes/shared/ShowPage.js
// Included in:   _includes/shared/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Stop updating the SVG notation on the webpage
//                (usually because it is hidden because the
//                work page is not being displayed).
//
{% endcomment %}

POPC2.prototype.DeactivateNotationUpdates = function () {
	this.DebugMessageFunction();
	let element = document.querySelector("#humdrum");
	if (element) {
		element.id = "humdrum-deactivated";
	}
};

Object.defineProperty(POPC2.prototype.DeactivateNotationUpdates, "name", { value: "DeactivateNotationUpdates" });



