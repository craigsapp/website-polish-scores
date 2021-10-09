{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/storeSearchInfo.js
// Used by:       _includes/browse/filterBrowseIndex.js
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Initializations for the browse page.
//
{% endcomment %}

POPC2.prototype.storeSearchInfo = function (search) {
	this.DebugMessageFunction();
	if (!search) {
		search = this.GLOBAL.SEARCH;
	}
	if (!search) {
		search = {};
	}
	localStorage.SEARCH = JSON.stringify(search);
};

Object.defineProperty(POPC2.prototype.storeSearchInfo, "name", { value: "storeSearchInfo" });



