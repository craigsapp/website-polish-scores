{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Nov  3 11:20:34 PDT 2021
// Last Modified: Wed Nov  3 11:20:36 PDT 2021
// Filename:      _includes/sort/sortByBookmark.js
// Used by:
// Included in:   _includes/sort/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Sort entries in reverse order (so that the most recent bookmark
//                is displayed first).
//
{% endcomment %}

POPC2.prototype.sortByBookmark = function (index, reverse) {
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

Object.defineProperty(POPC2.prototype.sortByBookmark, "name", { value: "sortByBookmark" });



