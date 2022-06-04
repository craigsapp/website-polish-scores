{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Oct 30 20:51:13 PDT 2021
// Last Modified: Thu Jun  2 22:39:06 PDT 2022
// Filename:      _includes/browse/displayBookmarkPage.js
// Used by:       _includes/handlebars/template-browse.html
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Toggle between bookmark and browse search results.
//
{% endcomment %}

POPC2.prototype.displayBookmarkPage = function () {
	this.DebugMessageFunction();
	this.manageSearchResults("bookmarks");
	this.showNavigator("bookmarks");
	this.ShowWebsiteTitle();
	this.displayBrowseTable();
	this.showBookmarksIfNotEmpty();
	this.showHistoryIfNotEmpty();
	this.showResultsCount(this.VARS.SEARCH_INDEX);
};

Object.defineProperty(POPC2.prototype.displayBookmarkPage, "name", { value: "displayBookmarkPage" });



