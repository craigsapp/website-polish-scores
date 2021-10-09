{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 20:03:37 PDT 2021
// Last Modified: Wed Oct  6 20:03:40 PDT 2021
// Filename:      _includes/listeners/browse-index.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Load index files from the server.
//
{% endcomment %}

document.addEventListener("DOMContentLoaded", function() {
	let url = popc2.SETTINGS.browse_index;
	popc2.DebugMessage("DOWNLOADING BROWSE INDEX FROM " + url, "pink");
	fetch(url)
		.then(res => res.json())
		.then(json => {
			popc2.DebugMessage("DOWNLOADED BROWSE INDEX FROM " + url, "pink");
			popc2.GLOBAL.BROWSE_INDEX = json;
			// Add ._seq, ._prev and ._next parameters to browse index:
			for (let i=0; i<popc2.GLOBAL.BROWSE_INDEX.length; i++) {
				popc2.GLOBAL.BROWSE_INDEX[i]._seq = i;
				if (i > 0) {
					popc2.GLOBAL.BROWSE_INDEX[i]._prev = popc2.GLOBAL.BROWSE_INDEX[i-1];
				}
				if (i < popc2.GLOBAL.BROWSE_INDEX.length - 1) {
					popc2.GLOBAL.BROWSE_INDEX[i]._next = popc2.GLOBAL.BROWSE_INDEX[i+1];
				}
			}
			popc2.GLOBAL.SEARCH_RESULTS = json;
			let cgi = popc2.getCgiParameters();
			if (!cgi.lyrics) {
				// Show the search page now with any CGI-based search parameters.
				// but only showing of lyrics are not involved.
				popc2.displayBrowsePage();
			}
			popc2.downloadLyricsIndex();
		})
		.catch(err => { console.error(err); });
});



