{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct 15 00:29:41 PDT 2021
// Last Modified: Fri Oct 15 00:29:44 PDT 2021
// Filename:      _includes/shared/IsBrowsePage.js
// Used by:       nothing yet
// Included in:   _includes/shared/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Checks if the browse page is currently being displayed.
//
{% endcomment %}

POPC2.prototype.IsBrowsePage = function () {
	this.DebugMessageFunction();
	let element = document.querySelector("#page-browse");
	if (element && element.classList.contains("hidden")) {
		return false;
	} else {
		return true;
	}
};

Object.defineProperty(POPC2.prototype.IsBrowsePage, "name", { value: "IsBrowsePage" });



