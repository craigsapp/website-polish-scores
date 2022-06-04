{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Jun  3 10:53:04 PDT 2022
// Last Modified: Fri Jun  3 10:53:07 PDT 2022
// Filename:      _includes/browse/manageSearchResults.js
// Used by:
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Handles history/browse/bookmarks displayed work lists.
//
{% endcomment %}


POPC2.prototype.manageSearchResults = function (newPage) {
	this.DebugMessageFunction();

	let navigators = document.querySelectorAll("[id^='navigator-']");
	let oldPage = "";
	for (let i=0; i<navigators.length; i++) {
		let n = navigators[i];
		let hidden = n.classList.contains("hidden");
		if (hidden) {
			continue;
		}
		let id = n.id || "";
		let matches = id.match(/navigator-([^\s]+)/);
		if (matches) {
			oldPage = matches[1];
			break;
		}
	}

	if (newPage === "browse") {
		this.VARS.SEARCH_SORT_TYPE = this.VARS.SAVED_SORT_TYPE;
		if (this.VARS.SEARCH_RESULTS_BACKUP) {
			this.VARS.SEARCH_RESULTS = this.VARS.SEARCH_RESULTS_BACKUP;
			this.VARS.SEARCH_RESULTS_BACKUP = null;
		}

		if (this.VARS.SEARCH_INDEX_BACKUP) {
			this.VARS.SEARCH_INDEX = this.VARS.SEARCH_INDEX_BACKUP;
			this.VARS.SEARCH_INDEX_BACKUP = null;
		}

	} else if (newPage === "history") {
		if (oldPage === "browse") {
			// replace search results with bookmarks list
			this.VARS.SAVED_SORT_TYPE = this.VARS.SEARCH_SORT_TYPE;
			this.VARS.SEARCH_RESULTS_BACKUP = this.VARS.SEARCH_RESULTS;
			this.VARS.SEARCH_INDEX_BACKUP = this.VARS.SEARCH_INDEX;
		}
		this.VARS.SEARCH_SORT_TYPE = "history";
		this.VARS.SEARCH_RESULTS = this.VARS.WORK_HISTORY;
		this.VARS.SEARCH_INDEX   = this.VARS.WORK_HISTORY;
	}

	else if (newPage === "bookmarks") {
		if (oldPage === "browse") {
			// replace search results with bookmarks list
			this.VARS.SAVED_SORT_TYPE = this.VARS.SEARCH_SORT_TYPE;
			this.VARS.SEARCH_RESULTS_BACKUP = this.VARS.SEARCH_RESULTS;
			this.VARS.SEARCH_INDEX_BACKUP = this.VARS.SEARCH_INDEX;
		}
		this.VARS.SEARCH_SORT_TYPE = "bookmark";
		this.VARS.SEARCH_RESULTS = this.VARS.WORK_BOOKMARKS;
		this.VARS.SEARCH_INDEX   = this.VARS.WORK_BOOKMARKS;
	}

};

Object.defineProperty(POPC2.prototype.manageSearchResults, "name", { value: "manageSearchResults" });



