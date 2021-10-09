{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/showResultsCount.js
// Used by:       _includes/browse/filterBrowseIndex.js
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:
//
{% endcomment %}

POPC2.prototype.showResultsCount = function (count) {
	this.DebugMessageFunction();
	let element = document.querySelector("#results-count");
	if (!element) {
		return;
	}
	let output = "";
	if (!count) {
		output = "0 ";
		output += "matches";
	} else if (count == 1) {
		output = "1 ";
		output += "match";
	} else if (count == this.GLOBAL.BROWSE_INDEX.length) {
		// Everything matches, so not interesting to show the count.
		output = "";
	} else {
		output = count.toString() + " ";
		output += "matches";
	}
	element.innerHTML = output;
};

Object.defineProperty(POPC2.prototype.showResultsCount, "name", { value: "showResultsCount" });



