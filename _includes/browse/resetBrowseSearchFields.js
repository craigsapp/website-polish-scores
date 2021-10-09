{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:29:12 PDT 2021
// Last Modified: Wed Oct  6 12:29:15 PDT 2021
// Filename:      _includes/browse/resetBrowseSearchFields.js
// Used by:       _includes/handlebars/template-browse.html
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Clear the search fields on the browse page.
//
{% endcomment %}

POPC2.prototype.resetBrowseSearchFields = function () {
	this.DebugMessageFunction(JSON.stringify(this.GLOBAL.SEARCH));
	this.GLOBAL.SEARCH = {};

	this.GLOBAL.SEARCH_FREEZE = true;

	var centuryElement     = document.querySelector("select.filter.century");
	var composerElement    = document.querySelector("select.filter.composer");
	var siglumElement      = document.querySelector("select.filter.siglum");
	var genreElement       = document.querySelector("select.filter.genre");
	var nationalityElement = document.querySelector("select.filter.nationality");
	var titleElement       = document.querySelector("input.filter.title");
	var lyricsElement      = document.querySelector("input.filter.lyrics");

	if (centuryElement) {
		centuryElement.value = "";
	}
	if (composerElement) {
		composerElement.value = "";
	}
	if (siglumElement) {
		siglumElement.value = "";
	}
	if (genreElement) {
		genreElement.value = "";
	}
	if (nationalityElement) {
		nationalityElement.value = "";
	}
	if (titleElement) {
		titleElement.value = "";
	}
	if (lyricsElement) {
		lyricsElement.value = "";
	}
	this.GLOBAL.SEARCH_FREEZE = false;

	this.filterBrowseIndex();

};

Object.defineProperty(POPC2.prototype.resetBrowseSearchFields, "name", { value: "resetBrowseSearchFields" });



