// vim: ts=3


//////////////////////////////
//
// COMContentLoaded event listener -- Load index files from the server.
//

document.addEventListener("DOMContentLoaded", function() {
	
	let url = "{{ site.browse_index }}";
	{% if site.debug == "true" %}
		console.log("GOING TO DOWNLOAD BROWSE INDEX FROM", url);
	{% endif %}
	fetch(url)
		.then(res => res.json())
		.then(json => {
			// console.log("JSON DATA FOR BROWSE INDEX", json); 
			GLOBAL.BROWSE_INDEX = json; 
			for (let i=0; i<GLOBAL.BROWSE_INDEX.length; i++) {
				GLOBAL.BROWSE_INDEX[i].seq = i;
			}
			GLOBAL.BROWSE_RESULTS = json;
			let cgi = getCgiParameters();
			if (!cgi.lyrics) {
				// Show the search page now with any CGI-based search parameters.
				// but only showing of lyrics are not involved.
				displayBrowsePage();
			}
			downloadLyricsIndex();
		})
		.catch(err => { console.error('Error:', err)});

});



