{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Oct 30 13:57:43 PDT 2021
// Last Modified: Sat Oct 30 13:57:45 PDT 2021
// Filename:      _includes/browse/toggleComposerSort.js
// Used by:       _includes/handlebars/template-browse.html
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle between composer sorting and whatever the
//                previous sorting method was.
//
{% endcomment %}

POPC2.prototype.toggleComposerSort = function () {
	this.DebugMessageFunction();

	let current  = this.VARS.SEARCH_SORT_TYPE;
	let previous = this.VARS.SEARCH_SORT_TYPE_PREV;
	if (current === "composer") {
		this.VARS.SEARCH_SORT_TYPE = previous;
		this.VARS.SEARCH_SORT_TYPE_PREV = current;
	} else if (previous === "composer") {
		this.VARS.SEARCH_SORT_TYPE = previous;
		this.VARS.SEARCH_SORT_TYPE_PREV = current;
	} else {
		this.VARS.SEARCH_SORT_TYPE = "composer";
		this.VARS.SEARCH_SORT_TYPE_PREV = current;
	}
	this.displayBrowseTable();

};

Object.defineProperty(POPC2.prototype.toggleComposerSort, "name", { value: "toggleComposerSort" });



