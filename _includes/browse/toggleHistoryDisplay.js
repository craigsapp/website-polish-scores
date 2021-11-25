{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Nov  3 11:45:57 PDT 2021
// Last Modified: Wed Nov  3 11:45:59 PDT 2021
// Filename:      _includes/browse/toggleHistoryDisplay.js
// Used by:       _includes/handlebars/template-browse.html
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle between history and browse search results.
//
{% endcomment %}

POPC2.prototype.toggleHistoryDisplay = function () {
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

	hstate = !hstate;
	if (hstate) {
		this.VARS.SEARCH_SORT_TYPE = "history";
		helement.classList.add("selected");
		if (felement) {
			felement.classList.add("hidden");
		}
		this.VARS.SEARCH_RESULTS = this.VARS.WORK_HISTORY;
		this.VARS.SEARCH_INDEX   = this.VARS.WORK_HISTORY;
		if (h1element) {
			h1element.innerHTML = this.getTranslation("history");
		}

		// Turn off bookmark if already selected:
		if (belement) {
			belement.classList.remove("selected");
		}
	} else {
		this.VARS.SEARCH_SORT_TYPE = this.VARS.SAVED_SORT_TYPE;
		helement.classList.remove("selected");
		if (felement) {
			// (no longer hidden)
			felement.classList.remove("hidden");
		}
		this.VARS.SEARCH_RESULTS = this.VARS.SCORE_INDEX;
		this.VARS.SEARCH_INDEX   = this.VARS.SCORE_INDEX;
		if (h1element) {
			h1element.innerHTML = this.getTranslation(`title_${this.VARS.REPERTORY}`);
		}
	}

	this.displayBrowseTable();
	this.showResultsCount(this.VARS.SEARCH_INDEX);
};

Object.defineProperty(POPC2.prototype.toggleHistoryDisplay, "name", { value: "toggleHistoryDisplay" });



