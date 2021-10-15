{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct 15 00:25:34 PDT 2021
// Last Modified: Fri Oct 15 00:25:36 PDT 2021
// Filename:      _includes/shared/IsWorkPage.js
// Used by:       _includes/listeners/processKeyboardCommand.js
// Included in:   _includes/shared/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Checks if a work page is currently being displayed.
//
{% endcomment %}

POPC2.prototype.IsWorkPage = function () {
	this.DebugMessageFunction();

	let element = document.querySelector("#page-work");
	if (element && element.classList.contains("hidden")) {
		return false;
	} else {
		return true;
	}

};

Object.defineProperty(POPC2.prototype.IsWorkPage, "name", { value: "IsWorkPage" });



