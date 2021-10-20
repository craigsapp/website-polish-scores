{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Oct 19 22:31:19 PDT 2021
// Last Modified: Tue Oct 19 22:31:22 PDT 2021
// Filename:      _includes/work/updateBookmarksInLocalStorage.js
// Used by:
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Store workids for bookmark list in localStorage.
//
{% endcomment %}

POPC2.prototype.updateBookmarksInLocalStorage = function () {
	this.DebugMessageFunction();

	let list = [];
	let bookmarks = this.VARS.WORK_BOOKMARKS;
	for (let i=0; i<bookmarks.length; i++) {
		let workid = bookmarks[i].fileid;
		if (workid) {
			list.push(workid);
		}
	}
	localStorage.WORK_BOOKMARKS = JSON.stringify(list);
};

Object.defineProperty(POPC2.prototype.updateBookmarksInLocalStorage, "name", { value: "updateBookmarksInLocalStorage" });



