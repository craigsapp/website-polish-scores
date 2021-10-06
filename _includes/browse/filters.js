//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/filters.js
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Main function to build the search form on the browse page.
//


//////////////////////////////
//
// buildBrowseFilters --
//

function buildBrowseFilters() {
	buildCenturyFilter(GLOBAL.BROWSE_INDEX);
	buildComposerFilter(GLOBAL.BROWSE_INDEX);
	buildSiglumFilter(GLOBAL.BROWSE_INDEX);
	buildGenreFilter(GLOBAL.BROWSE_INDEX);
	buildNationalityFilter(GLOBAL.BROWSE_INDEX);
	buildTitleFilter();
	buildLyricsFilter();
}



