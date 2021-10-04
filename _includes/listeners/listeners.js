// vim: ts=3

let BROWSE_INDEX = [];
let BROWSE_RESULTS = [];

document.addEventListener("DOMContentLoaded", function() {
	
	let url = "{{ site.browse_index }}";
	{% if site.debug == "true" %}
		console.log("GOING TO DOWNLOAD BROWSE INDEX FROM", url);
	{% endif %}
	fetch(url)
		.then(res => res.json())
		.then(json => {
			{% if site.debug == "true" %}
				console.log("JSON DATA FOR BROWSE INDEX", json); 
			{% endif %}
			BROWSE_INDEX = json; 
			for (let i=0; i<BROWSE_INDEX.length; i++) {
				BROWSE_INDEX[i].seq = i;
			}
			BROWSE_RESULTS = json;
			displayBrowsePage();
		})
		.catch(err => { console.error('Error:', err)});
});



