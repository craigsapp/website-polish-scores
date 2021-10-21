{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Oct 19 22:15:39 PDT 2021
// Last Modified: Tue Oct 19 22:15:42 PDT 2021
// Filename:      _includes/work/toggleBookmark.js
// Used by:       _includes/navigator/toolbar-work.html
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle bookmark for currently displayed score.
//
{% endcomment %}

POPC2.prototype.toggleBookmark = function () {
	this.DebugMessageFunction();

	let workid = this.VARS.WORK_ID;
	let obj = this.GetIndexAndTypeInSearchResults(workid, this.VARS.SCORE_INDEX);
	let entryi = obj.index;
	let type = obj.type;
	if (entryi < 0) {
		return;
	}
	let entry = this.VARS.SCORE_INDEX[entryi];
	let isInList = false;
	let bookmarks = this.VARS.WORK_BOOKMARKS;
	let bindex = -1;
	for (let i=0; i<bookmarks.length; i++) {
		if (bookmarks[i][type] === workid) {
			isInList = true;
			bindex = i;
			break;
		}
	}
	let element = document.querySelector("#bookmark-button");
	if (isInList) {
		// Remove from list and unselect bookmark icon.
		bookmarks.splice(bindex, 1);
		if (element) {
			element.classList.remove("selected");
		}
	} else {
		// Add to list and select bookmark icon.
		bookmarks.push(entry);
		if (element) {
			element.classList.add("selected");
		}
	}
	this.updateBookmarksInLocalStorage();

};

Object.defineProperty(POPC2.prototype.toggleBookmark, "name", { value: "toggleBookmark" });



