{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Oct 30 20:51:13 PDT 2021
// Last Modified: Thu Jun  2 22:39:06 PDT 2022
// Filename:      _includes/browse/displayAccessibilityPage.js
// Used by:       _includes/handlebars/template-browse.html
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle between Declaration of Accessibility and browse search results. Copied and adjusted by JI.
//
{% endcomment %}

POPC2.prototype.displayAccessibilityPage = function () {
	//this.DebugMessageFunction();
	//this.manageSearchResults("bookmarks");
	this.showNavigator("accessibility");
	this.ShowWebsiteTitle();
	//this.displayBrowseTable();
	//this.showBookmarksIfNotEmpty();
	//this.showHistoryIfNotEmpty();
	//this.showResultsCount(this.VARS.SEARCH_INDEX);
	let browsePage = document.querySelector("#page-browse");
	browsePage.classList.add("hidden");
	let accessibilityPage = document.querySelector("#page-accessibility");
	accessibilityPage.classList.remove("hidden");
	let accessibilityPl = document.getElementById("accessibility_pl");
	let accessibilityEn = document.getElementById("accessibility_en");

	if	(popc2.VARS.LANGUAGE === "PL") {
		if (accessibilityPl.classList.contains("hidden")) {
			accessibilityPl.classList.remove("hidden");
		} if (!accessibilityEn.classList.contains("hidden")) {
			accessibilityEn.classList.add("hidden");
		}
	} else {
		if (accessibilityEn.classList.contains("hidden")) {
			accessibilityEn.classList.remove("hidden");
		} if (!accessibilityPl.classList.contains("hidden")) {
			accessibilityPl.classList.add("hidden");
		}
	}
};

Object.defineProperty(POPC2.prototype.displayAccessibilityPage, "name", { value: "displayAccessibilityPage" });



