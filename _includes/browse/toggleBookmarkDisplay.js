{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Oct 30 20:51:13 PDT 2021
// Last Modified: Sat Oct 30 20:51:17 PDT 2021
// Filename:      _includes/browse/toggleBookmarkDisplay.js
// Used by:       _includes/handlebars/template-browse.html
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle between bookmark and browse search results.
//
{% endcomment %}

POPC2.prototype.toggleBookmarkDisplay = function () {
	this.DebugMessageFunction();
	
	let belement = document.querySelector("#bookmark-browse-button");
	if (!belement) {
		console.error("CANNOT FIND BOOKMARK BUTTON");
		return;
	}
	let helement = document.querySelector("#history-browse-button");
	if (!helement) {
		console.error("CANNOT FIND HISTORY BUTTON");
		return;
	}

	let bstate = 0;
	if (belement.classList.contains("selected")) {
		bstate = 1;
	}

	let hstate = 0;
	if (helement.classList.contains("selected")) {
		hstate = 1;
	}

	// Store the browse sort method if both hstate and bstate are 0.
	if ((bstate == 0) && (hstate == 0)) {
		this.VARS.SAVED_SORT_TYPE = this.VARS.SEARCH_SORT_TYPE;
	}

	// let felement = document.querySelector("#filters");
	let felement = null; // Allow search filters for bookmark page.
	let h1element = document.querySelector("h1");

	bstate = !bstate;
	if (bstate) {
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
	} else {
		this.VARS.SEARCH_SORT_TYPE = this.VARS.SAVED_SORT_TYPE;
		belement.classList.remove("selected");
		if (felement) {
			// (no longer hidden)
			felement.classList.remove("hidden");
		}
		this.VARS.SEARCH_RESULTS = this.VARS.SCORE_INDEX;
		this.VARS.SEARCH_INDEX   = this.VARS.SCORE_INDEX;
		if (h1element) {
			h1element.innerHTML = this.getTranslation("title");
		}
	}

	this.displayBrowseTable();
};

Object.defineProperty(POPC2.prototype.toggleBookmarkDisplay, "name", { value: "toggleBookmarkDisplay" });



