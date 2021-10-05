// vim: ts=3


//////////////////////////////
//
// buildBrowseFilters --
//

function buildBrowseFilters() {
	buildCenturyFilter(BROWSE_INDEX);
	buildComposerFilter(BROWSE_INDEX);
	buildSiglumFilter(BROWSE_INDEX);
	buildGenreFilter(BROWSE_INDEX);
	buildNationalityFilter(BROWSE_INDEX);
	buildTitleFilter();
	buildLyricsFilter();
}



