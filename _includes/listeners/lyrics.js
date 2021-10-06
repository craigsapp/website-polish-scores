


//////////////////////////////
//
// downloadLyricsIndex -- Download the search index for lyrics and
//   insert its contents into BROWSE_INDEX in the .lyrics field.
//

function downloadLyricsIndex() {
	let url = "{{ site.lyrics_index }}";
	{% if site.debug == "true" %}
		console.log("GOING TO DOWNLOAD LYRICS INDEX FROM", url);
	{% endif %}
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
			for (let i=0; i<BROWSE_INDEX.length; i++) {
				let id = BROWSE_INDEX[i].cenid;
				if (id) {
					let lyrics = index[id];
					if (lyrics) {
						BROWSE_INDEX[i].lyrics = lyrics;
					}
				}
			}
			let cgi = getCgiParameters();
			if (cgi.lyrics || SEARCH.lyrics) {
				// Do a CGI-base browse search, but only if it includes lyrics.
				// If no lyrics involved, then the search was already done.
				displayBrowsePage();
			}
			{% if site.debug == "true" %}
				console.log("DOWNLOADED LYRICS INDEX FROM", url);
			{% endif %}
			// Now download the composer index
			downloadComposerIndex();
		})
		.catch(err => { console.error('Error:', err)});
}



