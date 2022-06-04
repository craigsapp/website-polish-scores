{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Jun  3 21:47:28 PDT 2022
// Last Modified: Fri Jun  3 21:47:31 PDT 2022
// Filename:      _includes/browse/showHistoryIfNotEmpty.js
// Used by:
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Handles history/browse/history displayed work lists.
//
{% endcomment %}


POPC2.prototype.showHistoryIfNotEmpty = function () {
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

	let starIcon = currentNavigator.querySelector(".history");
	if (pageName === "work") {
		// star icon on work page is always supposed to be visible.
		if (starIcon) {
			starIcon.classList.remove("hidden");
		}
		return;
	}
	if (pageName === "history") {
		// star icon on history page is always supposed to be visible.
		if (starIcon) {
			starIcon.classList.remove("hidden");
		}
		return;
	}

	if (starIcon) {
		if (this.VARS.WORK_HISTORY && this.VARS.WORK_HISTORY.length > 0) {
			starIcon.classList.remove("hidden");
		} else {
			starIcon.classList.add("hidden");
		}
	}

};

Object.defineProperty(POPC2.prototype.showHistoryIfNotEmpty, "name", { value: "showHistoryIfNotEmpty" });



