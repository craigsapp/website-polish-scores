{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 20:03:37 PDT 2021
// Last Modified: Wed Oct  6 20:03:40 PDT 2021
// Filename:      _includes/listeners/downloadScoreIndex.js
// Used by:
// Included in:   _includes/listeners/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Load index files from the server.
//
{% endcomment %}

document.addEventListener("DOMContentLoaded", function() {
	let url = popc2.SETTINGS.score_index;
	popc2.DebugMessage("DOWNLOADING SCORE INDEX FROM " + url, "pink");

	popc2.prepareCgiVariables();

	fetch(url)
		.then(res => res.json())
		.then(json => {
			popc2.DebugMessage("DOWNLOADED SCORE INDEX FROM " + url, "pink");
			popc2.PrepareDownloadedScoreIndex(json);
			popc2.prepareBrowseSelectOptions();
			popc2.loadBookmarksFromLocalStorage();
			popc2.downloadSiglumIndex();
			popc2.downloadInstrumentIndex();

			if (popc2.VARS.WORK_ID) {
				// Display of work page handled by downloadComposerIndex().
				// popc2.displayWorkPage();
			} else if ((!popc2.VARS.SEARCH.lyrics) && (!popc2.VARS.SEARCH.pitch)) {
				// Show the search page now with any CGI-based search parameters.
				// but only showing of lyrics are not involved.
				popc2.displayBrowsePage();
			}

			// Now download secondary indexes.  Both of the following downloads
			// will add extra fields to the popcs.VARS.SCORE_INDEX object.

			// Lyrics index is for searching for words in musical text:
			popc2.downloadLyricsIndex();

			// Composer index is for enhancing information about composers:
			popc2.downloadComposerIndex();

			// Pitch index is for searching for melodic pitch in musical notes:
			popc2.downloadPitchIndex();

		})
		.catch(err => { console.error(err); });

});



