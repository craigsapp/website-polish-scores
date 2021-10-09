{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 20:03:37 PDT 2021
// Last Modified: Wed Oct  6 20:03:40 PDT 2021
// Filename:      _includes/listeners/getBrowseWorkId.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:
//
{% endcomment %}

POPC2.prototype.getBrowseWorkId = function (path) {
	this.DebugMessageFunction();
	let inBrowseTable = this.isInBrowseTable(path);
	if (!inBrowseTable) {
		return null;
	}
	for (let i=0; i<path.length; i++) {
		if (path[i].nodeName !== "TR") {
			continue;
		}
		if (!path[i].dataset) {
			return null;
		}
		let id = path[i].dataset.id;
		return id;
	}
};

Object.defineProperty(POPC2.prototype.getBrowseWorkId, "name", { value: "getBrowseWorkId" });



