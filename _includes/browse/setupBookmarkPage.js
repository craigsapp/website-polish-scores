{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Feb 14 00:11:57 PST 2022
// Last Modified: Mon Feb 14 00:12:00 PST 2022
// Filename:      _includes/browse/setupBookmarkDisplay.js
// Used by:       
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle between bookmark and browse search results.
//
{% endcomment %}

POPC2.prototype.setupBookmarkDisplay = function (belement, helement, felement, h1element) {
	this.DebugMessageFunction();

	if (!belement) {
		belement = document.querySelector("#bookmark-browse-button");
		if (!belement) {
			console.error("CANNOT FIND BOOKMARK BUTTON");
			return;
		}
	}

	if (!helement) {
		helement = document.querySelector("#history-browse-button");
		if (!helement) {
			console.error("CANNOT FIND HISTORY BUTTON");
			return;
		}
	}

	if (!felement) {
		// let felement = document.querySelector("#filters");
		felement = null; // Allow search filters for bookmark page.
	}
	if (!h1element) {
		h1element = document.querySelector("h1");
	}

	this.VARS.SEARCH_SORT_TYPE = "bookmark";
	belement.classList.add("selected");
	if (felement) {
		felement.classList.add("hidden");
	}
	this.VARS.SEARCH_RESULTS = this.VARS.WORK_BOOKMARKS;
	this.VARS.SEARCH_INDEX   = this.VARS.WORK_BOOKMARKS;
	if (h1element) {
		h1element.innerHTML = this.getTranslation("bookmarks");
	}

	// Turn off history if already selected:
	if (helement) {
		helement.classList.remove("selected");
	}

};

Object.defineProperty(POPC2.prototype.setupBookmarkDisplay, "name", { value: "setupBookmarkDisplay" });



