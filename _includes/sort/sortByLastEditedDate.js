{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Thu Oct 21 10:27:12 PDT 2021
// Last Modified: Thu Oct 21 10:27:15 PDT 2021
// Filename:      _includes/sort/sortByLastEditedDate.js
// Used by:
// Included in:   _includes/sort/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Sort entries by the lastedit entry in the score index.
//                Most recent dates are listed first by default.
//
{% endcomment %}

POPC2.prototype.sortByLastEditedDate = function (index, reverse) {
	this.DebugMessageFunction();

	let newlist = [];
	if (!index) {
		return newlist;
	}

	for (let i=0; i<index.length; i++) {
		newlist.push(index[i]);
	}

	newlist.sort(function (a, b) {
		let numA = a.lastedit || 0;
		let numB = b.lastedit || 0;
		return numB - numA;
	});

	if (reverse) {
		newlist.reverse();
	}

	return newlist;
};

Object.defineProperty(POPC2.prototype.sortByLastEditedDate, "name", { value: "sortByLastEditedDate" });



