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
	let url = popc2.SETTINGS.browse_index;
	popc2.DebugMessage("DOWNLOADING SCORE INDEX FROM " + url, "pink");
	fetch(url)
		.then(res => res.json())
		.then(json => {
			popc2.DebugMessage("DOWNLOADED SCORE INDEX FROM " + url, "pink");
			popc2.VARS.SCORE_INDEX = json;
			// Add ._seq, ._prev and ._next parameters to browse index:
			for (let i=0; i<json.length; i++) {
				json[i]._seq = i;
				if (i > 0) {
					json[i]._prev = json[i-1];
				}
				if (i < json.length - 1) {
					json[i]._next = json[i+1];
				}
			}
         // Wrap links to next/previous browse entries?
			// json[0]._prev = json[json.length-1];
			// json[json.length-1]._next = json[0];

			popc2.VARS.SEARCH_RESULTS = json;
			popc2.prepareBrowseSelectOptions();

			if ((!popc2.VARS.SEARCH.lyrics) && (!popc2.VARS.SEARCH.pitch)) {
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



