{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Thu Oct 14 14:25:29 PDT 2021
// Filename:      _includes/browse/displayBrowsePage.js
// Used by:
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Generates the browse page starting with a
//                Handlebars template.
//
{% endcomment %}

POPC2.prototype.displayBrowsePage = function () {
	let pageElement = this.ShowPage("browse");

	// Initial page load sets the cursor to "progress" (mostly for the
	// workpage load which will take longer than the browse page).
	// Remove the waiting class to stop the cursor spinning:
	this.ClearWaitingCursor();

	this.DebugMessageFunction();

	let helement = document.querySelector("#history-browse-button");
	if (helement && helement.classList.contains("selected")) {
		this.setupHistoryPage();
		this.displayBrowseTable();
		this.showResultsCount(this.VARS.SEARCH_INDEX);
		return;
	}

	let belement = document.querySelector("#bookmark-browse-button");
	if (belement && belement.classList.contains("selected")) {
		this.setupBookmarkPage();
		this.displayBrowseTable();
		this.showResultsCount(this.VARS.SEARCH_INDEX);
		return;
	}

	this.showNavigator("browse");
	var telement = document.querySelector("#template-browse");
	if (!telement) {
		console.error("ERROR: Cannot find #template-browse.");
		return;
	}
	var tsource = telement.textContent;
	if (!tsource) {
		console.error("ERROR: Cannot find browse-page template");
		return;
	}
	var browseTemplate = Handlebars.compile(tsource);
	var output = browseTemplate();

	if (pageElement) {
		pageElement.innerHTML = output;
	}

	if (this.VARS.BROWSE_STYLE === "more") {
		this.showBrowseMore();
	} else {
		this.showBrowseLess();
	}

	this.HideIiifLogo();
	this.showNavigator("browse");
	this.ApplyElementTranslations();
	this.buildBrowseFilters();
	this.doBrowseSearch();
};

Object.defineProperty(POPC2.prototype.displayBrowsePage, "name", { value: "displayBrowsePage" });



