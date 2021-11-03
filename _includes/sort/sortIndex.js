{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Oct 17 15:31:28 PDT 2021
// Last Modified: Sat Oct 30 13:58:35 PDT 2021
// Filename:      _includes/sort/sortIndex.js
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
	this.DebugMessageFunction(this.VARS.SEARCH_SORT_TYPE);

	let newlist = index;
	if (this.VARS.SEARCH_SORT_TYPE === "notecount") {
		newlist = this.sortByNoteCount(index, this.VARS.SEARCH_SORT_REVERSE);
	} else if (this.VARS.SEARCH_SORT_TYPE === "lastedit") {
		newlist = this.sortByLastEditedDate(index, this.VARS.SEARCH_SORT_REVERSE);
	} else if (this.VARS.SEARCH_SORT_TYPE === "shelfmark") {
		newlist = this.sortByShelfmark(index, this.VARS.SEARCH_SORT_REVERSE);
	} else if (this.VARS.SEARCH_SORT_TYPE === "title") {
		newlist = this.sortByTitle(index, this.VARS.SEARCH_SORT_REVERSE);
	} else if (this.VARS.SEARCH_SORT_TYPE === "composer") {
		newlist = this.sortByComposer(index, this.VARS.SEARCH_SORT_REVERSE);
	} else if (this.VARS.SEARCH_SORT_TYPE === "bookmark") {
		newlist = this.sortByBookmark(index, this.VARS.SEARCH_SORT_REVERSE);
	} else if (this.VARS.SEARCH_SORT_TYPE === "history") {
		newlist = this.sortByHistory(index, this.VARS.SEARCH_SORT_REVERSE);
	}

	return newlist;
};

Object.defineProperty(POPC2.prototype.sortIndex, "name", { value: "sortIndex" });



