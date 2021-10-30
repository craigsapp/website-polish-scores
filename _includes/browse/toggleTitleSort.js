{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Thu Oct 21 12:51:11 PDT 2021
// Last Modified: Thu Oct 21 12:51:13 PDT 2021
// Filename:      _includes/browse/toggleTitleSort.js
// Used by:       _includes/handlebars/template-browse.html
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle between title sorting and whatever the
//                previous sorting method was.
//
{% endcomment %}

POPC2.prototype.toggleTitleSort = function () {
	this.DebugMessageFunction();

	let current  = this.VARS.SEARCH_SORT_TYPE;
	let previous = this.VARS.SEARCH_SORT_TYPE_PREV;
	if (current === "title") {
		this.VARS.SEARCH_SORT_TYPE = previous;
		this.VARS.SEARCH_SORT_TYPE_PREV = current;
	} else if (previous === "title") {
		this.VARS.SEARCH_SORT_TYPE = previous;
		this.VARS.SEARCH_SORT_TYPE_PREV = current;
	} else {
		this.VARS.SEARCH_SORT_TYPE = "title";
		this.VARS.SEARCH_SORT_TYPE_PREV = current;
	}
	this.displayBrowseTable();

};

Object.defineProperty(POPC2.prototype.toggleTitleSort, "name", { value: "toggleTitleSort" });



