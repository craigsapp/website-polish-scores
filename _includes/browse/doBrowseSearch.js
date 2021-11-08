{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/doBrowseSearch.js
// Used by:       _includes/browse/buildCenturyFilter.js
// Used by:       _includes/browse/buildComposerFilter.js
// Used by:       _includes/browse/buildGenreFilter.js
// Used by:       _includes/browse/buildLyricsFilter.js
// Used by:       _includes/browse/buildPitchFilter.js
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

POPC2.prototype.doBrowseSearch = function (index) {
	this.DebugMessageFunction();
	if (this.VARS.SEARCH_FREEZE) {
		return;
	}
	if (!index) {
		index = this.VARS.SEARCH_INDEX;
	}

	// Reset search
	this.VARS.SEARCH = {};

	let results = index;
	let newresults;

	// Search by composer first since there are pre-build
	// worklist for composers that can speed up the search.
	results = this.filterByComposer(results);
	results = this.filterByCentury(results);
	results = this.filterBySiglum(results);
	results = this.filterByGenre(results);
	results = this.filterByNationality(results);
	results = this.filterByTitle(results);
	results = this.filterByLyrics(results);
	results = this.filterByPitch(results);

	if (results.length != this.VARS.SEARCH_INDEX.length) {
		this.VARS.SEARCH_FREEZE = true;
		this.buildComposerFilter(results);
		this.buildCenturyFilter(results);
		this.buildSiglumFilter(results);
		this.buildGenreFilter(results);
		this.buildNationalityFilter(results);
		this.VARS.SEARCH_FREEZE = false;
	}
	this.buildBrowseFilters(results);


	results = this.sortIndex(results);

	this.showResultsCount(results);
	this.VARS.SEARCH_RESULTS = results;
	this.VARS.SEARCH.count = results.length;
	this.VARS.SEARCH.lang  = this.VARS.LANGUAGE;
	this.storeSearchInfo(this.VARS.SEARCH);

	this.DisplayComposerInfoPortrait(this.VARS.SEARCH.composer);
	this.displayBrowseTable(results);
};

Object.defineProperty(POPC2.prototype.doBrowseSearch, "name", { value: "doBrowseSearch" });



