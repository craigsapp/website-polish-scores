{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Jun  3 21:32:16 PDT 2022
// Last Modified: Fri Jun  3 21:32:19 PDT 2022
// Filename:      _includes/browse/showBookmarksIfNotEmpty.js
// Used by:
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Handles history/browse/bookmarks displayed work lists.
//
{% endcomment %}


POPC2.prototype.showBookmarksIfNotEmpty = function () {
	this.DebugMessageFunction();

	let navigators = document.querySelectorAll("[id^='navigator-']");
	let pageName = "";
	let currentNavigator = null;

	for (let i=0; i<navigators.length; i++) {
		let n = navigators[i];
		let hidden = n.classList.contains("hidden");
		if (hidden) {
			continue;
		}
		let id = n.id || "";
		let matches = id.match(/navigator-([^\s]+)/);
		if (matches) {
			pageName = matches[1];
			currentNavigator = n;
			break;
		}
	}

	let starIcon = currentNavigator.querySelector(".bookmarks");
	if (pageName === "work") {
		// star icon on work page is always supposed to be visible.
		if (starIcon) {
			starIcon.classList.remove("hidden");
		}
		return;
	}
	if (pageName === "bookmarks") {
		// star icon on bookmarks page is always supposed to be visible.
		if (starIcon) {
			starIcon.classList.remove("hidden");
		}
		return;
	}

	if (starIcon) {
		if (this.VARS.WORK_BOOKMARKS && this.VARS.WORK_BOOKMARKS.length > 0) {
			starIcon.classList.remove("hidden");
		} else {
			starIcon.classList.add("hidden");
		}
	}

};

Object.defineProperty(POPC2.prototype.showBookmarksIfNotEmpty, "name", { value: "showBookmarksIfNotEmpty" });



