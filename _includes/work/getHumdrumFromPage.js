{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Jan 23 20:13:11 PST 2022
// Last Modified: Sun Jan 23 20:13:13 PST 2022
// Filename:      _includes/work/getHumdrumFromPage.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Extract Humdrum from data storage on page.
//
{% endcomment %}

POPC2.prototype.getHumdrumFromPage = function(data) {
	this.DebugMessageFunction();
	element = document.querySelector("#humdrum");
	if (element) {
		return element.textContent;
	} else {
		return "";
	}
};

Object.defineProperty(POPC2.prototype.getHumdrumFromPage, "name", { value: "getHumdrumFromPage" });



