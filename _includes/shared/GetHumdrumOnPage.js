{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Dec  4 16:57:28 CET 2021
// Last Modified: Sat Dec  4 16:57:33 CET 2021
// Filename:      _includes/work/GetHumdrumOnPage.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Get Humdrum score that is being displayed currently on work page.
//
{% endcomment %}

POPC2.prototype.GetHumdrumOnPage = function(data) {
	this.DebugMessageFunction();
	element = document.querySelector("#humdrum");
	if (!element) {
		return "";
	} 
	return element.textContent;
};

Object.defineProperty(POPC2.prototype.GetHumdrumOnPage, "name", { value: "GetHumdrumOnPage" });



