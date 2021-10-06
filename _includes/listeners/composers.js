

// COMPOSERS -- Database of cmposers, indexed by their full names.
let COMPOSERS = {};

//////////////////////////////
//
// downloadComposerIndex -- Download the composer index and store
//     its contents into COMPOSERS global variable.
//

function downloadComposerIndex() {
	let url = "{{ site.composer_index }}";
	{% if site.debug == "true" %}
		console.log("GOING TO DOWNLOAD COMPOSER INDEX FROM", url);
	{% endif %}
	fetch(url)
		.then(res => res.json())
		.then(data => {
			// convert data to associative array
			COMPOSERS = {};
			for (let i=0; i<data.length; i++) {
				let COM = data[i].COM;
				if (!COM) {
					continue;
				}
				if (COM.match(/^\s*$/)) {
					continue;
				}
				COMPOSERS[COM] = data[i];
			}
			{% if site.debug == "true" %}
				console.log("DOWNLOADED COMPOSER INDEX FROM", url);
			{% endif %}
			updateComposerPortrait();
		})
		.catch(err => { console.error('Error:', err)});
}



