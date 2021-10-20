{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Oct 19 22:45:34 PDT 2021
// Last Modified: Tue Oct 19 22:45:37 PDT 2021
// Filename:      _includes/work/setBookmarkState.js
// Used by:
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Highlight the bookmark icon if the current work
//                is in the bookmark list.
//
{% endcomment %}

POPC2.prototype.setBookmarkState = function(fileid) {
	this.DebugMessageFunction();
	if (!fileid) {
		return;
	}
	let belement = document.querySelector("#bookmark-button");
	if (!belement) {
		return;
	}
	let bookmarks = this.VARS.WORK_BOOKMARKS;
	if (!bookmarks) {
		return;
	}
	let isInList = false;
	let bindex = -1;
	for (let i=0; i<bookmarks.length; i++) {
		if (bookmarks[i].fileid === fileid) {
			bindex = i;
			break;
		}
	}

	if (bindex < 0) {
		// Work is not in bookmarks
		belement.classList.remove("selected");
	} else {
		// Work is in bookmarks
		belement.classList.add("selected");
	}

};

Object.defineProperty(POPC2.prototype.setBookmarkState, "name", { value: "setBookmarkState" });



