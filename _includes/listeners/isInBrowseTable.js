{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 20:03:37 PDT 2021
// Last Modified: Wed Oct  6 20:03:40 PDT 2021
// Filename:      _includes/listeners/isInBrowseTable.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:
//
{% endcomment %}

POPC2.prototype.isInBrowseTable = function (path) {
	for (let i=0; i<path.length; i++) {
		if (path[i].nodeName !== "TABLE") {
			continue;
		}
		if (path[i].classList.contains("search-results")) {
			return true;
		}
	}
	return false;
}



