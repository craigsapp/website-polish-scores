{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Thu Mar 23 16:03:51 PDT 2023
// Last Modified: Thu Mar 23 16:08:41 PDT 2023
// Filename:      _includes/browse/toggleDateSorting.js
// Used by:       
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle between title sorting and whatever the
//                previous sorting method was.
//
{% endcomment %}

POPC2.prototype.toggleDateSorting = function () {
	this.DebugMessageFunction();

	let element = document.querySelector("date-browse-button");

	if (this.VARS.SEARCH_SORT_TYPE === "lastedit") {
		let tempval = this.VARS.SEARCH_SORT_TYPE;
		this.VARS.SEARCH_SORT_TYPE =  this.VARS.SEARCH_SORT_TYPE_LAST;
		this.VARS.SEARCH_SORT_TYPE_LAST = tempval;
		if (element) {
			element.classList.add("highlight");
		}
	} else {
		this.VARS.SEARCH_SORT_TYPE_LAST = this.VARS.SEARCH_SORT_TYPE;
		this.VARS.SEARCH_SORT_TYPE = "lastedit";
		if (element) {
			element.classList.add("highlight");
		}
	}
	this.displayBrowseTable();
};

Object.defineProperty(POPC2.prototype.toggleDateSorting, "name", { value: "toggleDateSorting" });



