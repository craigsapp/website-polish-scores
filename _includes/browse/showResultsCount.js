{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Sat Oct  9 19:31:58 PDT 2021
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
	if (count != this.VARS.SCORE_INDEX.length) {
		output = count + " " + this.getMatchText(count);
	} else {
		// Everything matches, so not interesting to show the count.
		output = "";
	}
	element.innerHTML = output;
};

Object.defineProperty(POPC2.prototype.showResultsCount, "name", { value: "showResultsCount" });



