{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Nov  3 00:48:31 PDT 2021
// Last Modified: Wed Nov  3 00:48:34 PDT 2021
// Filename:      _includes/browse/toggleHistoryDisplay.js
// Used by:       _includes/handlebars/template-browse.html
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle between history and score index.
//
{% endcomment %}

POPC2.prototype.toggleHistoryDisplay = function () {
	this.DebugMessageFunction();

	if (this.VARS.WORK_HISTORY == 0) {
		// Do not show history when there is no history.
		// Adjust this later to hide the history button when
		// there is no history (when using the Handlbars template
		// for the browse page).
		return;
	}
	
	let helement = document.querySelector("#history-browse-button");
	if (!helement) {
		console.log("CANNOT FIND B ELEMENT");
		return;
	}

	let state = 0;
	if (helement.classList.contains("selected")) {
		state = 1;
	}

	// let felement = document.querySelector("#filters");
	let felement = null; // Allow search filters for bookmark page.
	let h1element = document.querySelector("h1");

	state = !state;
	if (state) {
		helement.classList.add("selected");
		if (felement) {
			felement.classList.add("hidden");
		}
		this.VARS.SEARCH_RESULTS = this.VARS.WORK_HISTORY;
		this.VARS.SEARCH_INDEX   = this.VARS.WORK_HISTORY;
		if (h1element) {
			h1element.innerHTML = this.getTranslation("history");
		}
	} else {
		helement.classList.remove("selected");
		if (felement) {
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

Object.defineProperty(POPC2.prototype.toggleHistoryDisplay, "name", { value: "toggleHistoryDisplay" });



