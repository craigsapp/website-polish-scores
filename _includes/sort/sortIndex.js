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

POPC2.prototype.sortIndex = function (index) {
	this.DebugMessageFunction();

	let newlist = index;
	if (this.VARS.SEARCH_SORT_TYPE === "notecount") {
		newlist = this.sortByNoteCount(index, this.VARS.SEARCH_SORT_REVERSE);
	}

	return newlist;
};

Object.defineProperty(POPC2.prototype.sortByNoteCount, "name", { value: "sortByNoteCount" });



