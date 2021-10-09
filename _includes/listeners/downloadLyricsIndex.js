{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct  8 12:59:13 PDT 2021
// Last Modified: Fri Oct  8 12:59:15 PDT 2021
// Filename:      _includes/listeners/downloadLyricsIndex.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Download the search index for lyrics and insert its
//                contents into GLOBAL.BROWSE_INDEX in the .lyrics field.
//
{% endcomment %}

POPC2.prototype.downloadLyricsIndex = function () {
	let url = popc2.SETTINGS.lyrics_index;
	this.DebugMessage("DOWNLOADING LYRICS INDEX FROM " + url, "hotpink");
	let that = this;
	fetch(url)
		.then(res => res.text())
		.then(data => {
			let lines = data.split(/\r?\n/);
			let index = {};
			for (let i=0; i<lines.length; i++) {
				let line = lines[i];
				let matches = line.match(/^([^\t]+)\t(.*)$/);
				if (matches) {
					index[matches[1]] = matches[2];
				}
			}
			for (let i=0; i<that.GLOBAL.BROWSE_INDEX.length; i++) {
				let id = that.GLOBAL.BROWSE_INDEX[i].cenid;
				if (id) {
					let lyrics = index[id];
					if (lyrics) {
						that.GLOBAL.BROWSE_INDEX[i].lyrics = lyrics;
					}
				}
			}
			let cgi = popc2.getCgiParameters();
			if (cgi.lyrics || that.GLOBAL.SEARCH.lyrics) {
				// Do a CGI-base browse search, but only if it includes lyrics.
				// If no lyrics involved, then the search was already done.
				that.displayBrowsePage();
			}
			that.DebugMessage("DOWNLOADED LYRICS INDEX FROM " + url, "hotpink");
			// Now download the composer index
			that.downloadComposerIndex();
		})
		.catch(err => {
			that.DebugMessage("ERROR DOWNLOADING LYRICS INDEX: " + err, "hotpink");
		});
};



