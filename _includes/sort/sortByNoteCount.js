{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Oct 17 15:31:28 PDT 2021
// Last Modified: Sun Oct 17 15:31:31 PDT 2021
// Filename:      _includes/sort/sortByNoteCount.js
// Used by:
// Included in:   _includes/sort/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Sort entries by the number of notes in the score.
//                The input array is not sorted directly, since the
//                input is ususally the SEARCH_RESULTS array, which is
//                sometimes a copy of SCORE_INDEX (and better to avoid
//                sorting SCORE_INDEX at least for now).
//
{% endcomment %}

POPC2.prototype.sortByNoteCount = function (index, reverse) {
	this.DebugMessageFunction();

	let newlist = [];
	if (!index) {
		return newlist;
	}

	for (let i=0; i<index.length; i++) {
		newlist.push(index[i]);
	}

	newlist.sort(function (a, b) {
		let numA = a.notecount || 0;
		let numB = b.notecount || 0;
		return numA - numB;
	});

	if (reverse) {
		newlist.reverse();
	}

	return newlist;
};

Object.defineProperty(POPC2.prototype.sortByNoteCount, "name", { value: "sortByNoteCount" });



