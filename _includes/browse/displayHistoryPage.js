{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Nov  3 11:45:57 PDT 2021
// Last Modified: Wed Nov  3 11:45:59 PDT 2021
// Filename:      _includes/browse/displayHistoryPage.js
// Used by:       _includes/handlebars/template-browse.html
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle between history and browse search results.
//
{% endcomment %}

POPC2.prototype.displayHistoryPage = function () {
	this.DebugMessageFunction();
	this.manageSearchResults("history");
	this.showNavigator("history");
	this.ShowWebsiteTitle();
	this.displayBrowseTable();
	this.showBookmarksIfNotEmpty();
	this.showHistoryIfNotEmpty();
	this.showResultsCount(this.VARS.SEARCH_INDEX);
};

Object.defineProperty(POPC2.prototype.displayHistoryPage, "name", { value: "displayHistoryPage" });



