{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Sat Oct  9 19:31:58 PDT 2021
// Filename:      _includes/browse/showResultsCount.js
// Used by:       _includes/browse/doBrowseSearch.js
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
		output = `${count} ${this.getMatchText(count)}`;
	} else {
		// Everything matches, so show the total number of scores in the database:
		output = `${count} ${this.getTranslation("scores")}`;
	}
	element.innerHTML = output;
};

Object.defineProperty(POPC2.prototype.showResultsCount, "name", { value: "showResultsCount" });



