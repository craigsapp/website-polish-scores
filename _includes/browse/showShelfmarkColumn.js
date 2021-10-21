{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct 20 20:51:39 PDT 2021
// Last Modified: Wed Oct 20 20:51:41 PDT 2021
// Filename:      _includes/browse/showShelfmarkColumn.js
// Used by:       _includes/browse/displayBrowsePage.js
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Show the shelfmark column in the browse table.
//
{% endcomment %}

POPC2.prototype.showShelfmarkColumn = function () {
	this.DebugMessageFunction();
	let cells = document.querySelectorAll("th.shelfmark, td.shelfmark");
	for (let i=0; i<cells.length; i++) {
		cells[i].classList.remove("hidden");
	}
	let table = document.querySelector("table.search-results");
	if (table) {
		table.classList.remove("narrow");
	}
};

Object.defineProperty(POPC2.prototype.showShelfmarkColumn, "name", { value: "showShelfmarkColumn" });



