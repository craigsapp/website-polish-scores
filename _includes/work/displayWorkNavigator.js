{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Oct 11 22:30:44 PDT 2021
// Last Modified: Mon Oct 11 22:30:46 PDT 2021
// Filename:      _includes/work/displayWorkNavigator.js
// Used by:
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Display work navigator in the top left corner of the
//                webpages.  Only display next/previous text if there is
//                at least two entries in the SEARCH_RESULTS list.
//
{% endcomment %}

POPC2.prototype.displayWorkNavigator = function(data) {
	this.DebugMessageFunction();

	element = document.querySelector("#work-navigator");

	if (this.VARS.SEARCH_RESULTS && this.VARS.SEARCH_RESULTS.length > 1) {
		element.style.display = "inline-block";
		console.warn("DISPAYED WORK NAVIGATOR");
	} else {
		element.style.display = "none";
		console.warn("NO RESULTS");
	}

};

Object.defineProperty(POPC2.prototype.displayWorkNavigator, "name", { value: "displayWorkNavigator" });



