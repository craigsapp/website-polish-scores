{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/buildBrowseFilters.js
// Used by:       _includes/browse/displayBrowsePage.js
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Generate contents for all fields in browwe search form.
//
{% endcomment %}

POPC2.prototype.buildBrowseFilters = function () {
	this.DebugMessageFunction();
	this.buildCenturyFilter(this.GLOBAL.BROWSE_INDEX);
	this.buildComposerFilter(this.GLOBAL.BROWSE_INDEX);
	this.buildSiglumFilter(this.GLOBAL.BROWSE_INDEX);
	this.buildGenreFilter(this.GLOBAL.BROWSE_INDEX);
	this.buildNationalityFilter(this.GLOBAL.BROWSE_INDEX);
	this.buildTitleFilter();
	this.buildLyricsFilter();
};

Object.defineProperty(POPC2.prototype.buildBrowseFilters, "name", { value: "buildBrowseFilters" });



