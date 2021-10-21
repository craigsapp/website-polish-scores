{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:29:12 PDT 2021
// Last Modified: Mon Oct 11 18:23:58 PDT 2021
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
	this.DebugMessageFunction();
	this.VARS.SEARCH = {};

	this.VARS.SEARCH_FREEZE = true;
	localStorage.SEARCH = "{}";

	var centuryElement     = document.querySelector("select.filter.century");
	var composerElement    = document.querySelector("select.filter.composer");
	var siglumElement      = document.querySelector("select.filter.siglum");
	var genreElement       = document.querySelector("select.filter.genre");
	var nationalityElement = document.querySelector("select.filter.nationality");
	var titleElement       = document.querySelector("input.filter.title");
	var lyricsElement      = document.querySelector("input.filter.lyrics");
	var pitchElement       = document.querySelector("input.filter.pitch");

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
	if (pitchElement) {
		pitchElement.value = "";
	}
	this.VARS.SEARCH_FREEZE = false;

	this.VARS.SEARCH_RESULTS = this.VARS.SCORE_INDEX;
	this.buildBrowseFilters();
	this.doBrowseSearch();
	this.DisplayComposerInfoPortrait();

};

Object.defineProperty(POPC2.prototype.resetBrowseSearchFields, "name", { value: "resetBrowseSearchFields" });



