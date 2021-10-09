{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/filterBrowseIndex.js
// Used by:       _includes/browse/buildCenturyFilter.js
// Used by:       _includes/browse/buildComposerFilter.js
// Used by:       _includes/browse/buildGenreFilter.js
// Used by:       _includes/browse/buildLyricsFilter.js
// Used by:       _includes/browse/buildNationalityFilter.js
// Used by:       _includes/browse/buildSiglumFilter.js
// Used by:       _includes/browse/buildTitleFilter.js
// Used by:       _includes/browse/displayBrowsePage.js
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Filter the full index by various search fields.
//
{% endcomment %}

POPC2.prototype.filterBrowseIndex = function (index) {
	this.DebugMessageFunction();
	if (this.GLOBAL.SEARCH_FREEZE) {
		return;
	}
	if (!index) {
		index = this.GLOBAL.BROWSE_INDEX;
	}

	// Reset search
	this.GLOBAL.SEARCH = {};

	let results = index;
	let newresults;

	results = this.filterByCentury(results);
	results = this.filterByComposer(results);
	results = this.filterBySiglum(results);
	results = this.filterByGenre(results);
	results = this.filterByNationality(results);
	results = this.filterByTitle(results);
	results = this.filterByLyrics(results);

	if (results.length != this.GLOBAL.BROWSE_INDEX) {
		this.GLOBAL.SEARCH_FREEZE = true;
		this.buildCenturyFilter(results);
		this.buildComposerFilter(results);
		this.buildSiglumFilter(results);
		this.buildGenreFilter(results);
		this.buildNationalityFilter(results);
		this.GLOBAL.SEARCH_FREEZE = false;
	}

	this.GLOBAL.SEARCH_RESULTS = results;

	this.showResultsCount(results.length);

	this.GLOBAL.SEARCH.count = results.length;
	this.GLOBAL.SEARCH.lang  = this.GLOBAL.LANGUAGE;
	this.storeSearchInfo(this.GLOBAL.SEARCH);

	this.displayComposerBrowsePortrait();
	this.displayBrowseTable(results);
};

Object.defineProperty(POPC2.prototype.filterBrowseIndex, "name", { value: "filterBrowseIndex" });



