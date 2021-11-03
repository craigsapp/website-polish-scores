{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Oct 19 22:37:34 PDT 2021
// Last Modified: Tue Oct 19 22:37:37 PDT 2021
// Filename:      _includes/work/loadBookmarksFromLocalStorage.js
// Used by:
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Load bookmarks from fileids stored in localStorage.
//
{% endcomment %}

POPC2.prototype.loadBookmarksFromLocalStorage = function () {
	this.DebugMessageFunction();
	let content = localStorage.WORK_BOOKMARKS;
	if (!content) {
		return;
	}
	if (!content.match(/^[[]/)) {
		localStorage.WORK_BOOKMARKS = "";
	}

	let list = JSON.parse(content);
	let bookmarks = this.VARS.WORK_BOOKMARKS;

	for (let i=0; i<list.length; i++) {
		let fileid = list[i];
		let entryi = this.GetIndexInSearchResults(fileid, this.VARS.SEARCH_INDEX);
		if (entryi < 0) {
			// Probaly a deleted work, or the file ID changed.
			continue;
		}
		let entry = this.VARS.SCORE_INDEX[entryi];
		if (!entry) {
			continue;
		}
		bookmarks.push(entry);
	}

	belement = document.querySelector("#bookmark-browse-button");
	if (bookmarks && bookmarks.length > 0) {
		belement.classList.remove("hidden");
	} else {
		belement.classList.add("hidden");
	}
};

Object.defineProperty(POPC2.prototype.loadBookmarksFromLocalStorage, "name", { value: "loadBookmarksFromLocalStorage" });



