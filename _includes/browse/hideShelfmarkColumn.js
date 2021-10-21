{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct 20 20:56:31 PDT 2021
// Last Modified: Wed Oct 20 20:56:34 PDT 2021
// Filename:      _includes/browse/hideShelfmarkColumn.js
// Used by:       _includes/browse/displayBrowsePage.js
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Show the shelfmark column in the browse table.
//
{% endcomment %}

POPC2.prototype.hideShelfmarkColumn = function () {
	this.DebugMessageFunction();
	let cells = document.querySelectorAll("th.shelfmark, td.shelfmark");
	for (let i=0; i<cells.length; i++) {
		cells[i].classList.add("hidden");
	}
	let table = document.querySelector("table.search-results");
	if (table) {
		table.classList.add("narrow");
	}
};

Object.defineProperty(POPC2.prototype.hideShelfmarkColumn, "name", { value: "hideShelfmarkColumn" });



