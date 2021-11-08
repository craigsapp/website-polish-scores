{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Nov  3 11:32:48 PDT 2021
// Last Modified: Wed Nov  3 11:32:51 PDT 2021
// Filename:      _includes/sort/sortByHistory.js
// Used by:
// Included in:   _includes/sort/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Sort in reverse order (most recent is first).
//
{% endcomment %}

POPC2.prototype.sortByHistory = function (index, reverse) {
	this.DebugMessageFunction();

	let newlist = [];
	if (!index) {
		return newlist;
	}

	for (let i=0; i<index.length; i++) {
		newlist.push(index[i]);
	}
	if (!reverse) {
		newlist.reverse();
	}
	return newlist;
};

Object.defineProperty(POPC2.prototype.sortByHistory, "name", { value: "sortByHistory" });



