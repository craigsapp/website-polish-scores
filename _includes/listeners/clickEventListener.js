{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 20:03:37 PDT 2021
// Last Modified: Mon Dec  6 12:24:03 CET 2021
// Filename:      _includes/listeners/clickEventListener.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Event delegation for mouse clicks.  Clicking in the browse
//                search-results table will load a work page for the file
//                represented by that row.
//
{% endcomment %}

document.addEventListener("click", function (event) {
	if (!event) {
		return;
	}
	let target = event.target;
	if (!target) {
		return;
	}
	let path = popc2.BuildPath(target);
	let pageType = popc2.GetPageType();
	if ((pageType === "browse") || (pageType === "history") || (pageType === "bookmarks")) {
		let workid = popc2.getBrowseWorkId(path);
		if (workid) {
			popc2.displayWorkPage(workid);
		}
	} else if (pageType === "work") {
		popc2.toggleNoteHighlight(path);
	}
});


//
// When hovering (with the keyboard) over a button, use enter to
// click on the button.
//

document.addEventListener("keyup", function (event) {
	let target = event.target;
	if (!target) {
		return;
	}
	if (event.keyCode === 13) {
		if (target.tagName == "SELECT") {
			// ignore since down arrow will open select menu.
		} else {
			event.preventDefault();
			target.click();
		}
	}
});



