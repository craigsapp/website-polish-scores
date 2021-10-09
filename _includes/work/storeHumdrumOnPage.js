{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 19:24:32 PDT 2021
// Last Modified: Thu Oct  7 19:08:05 PDT 2021
// Filename:      _includes/work/storeHumdrumOnPage.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Store a downloaded Humdrum score on the page in preparation
//                to render to SVG and display on page.
//
{% endcomment %}

POPC2.prototype.storeHumdrumOnPage = function(data) {
	this.DebugMessageFunction();
	element = document.querySelector("#humdrum");
	element.textContent = data;
};

Object.defineProperty(POPC2.prototype.storeHumdrumOnPage, "name", { value: "storeHumdrumOnPage" });



