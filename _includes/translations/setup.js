// vim: ts=3

(function() {
	{% if site.debug == "true" %}
		console.log("PREPARING TRANSLATIONS");
	{% endif %}

	// Translation data is already embedded on the webpage, so extract
	// and store in the GLOBAL.TRANSLATIONS object.
	let atondata = document.querySelector("script#translations").textContent;
	let aton = new ATON;
	let translation_array = aton.parse(atondata).ENTRY;

	if (!Array.isArray(translation_array)) {
		// If only one entry in translation array, convert object to array:
		translation_array = [ translation_array ];
	}

	for (let i=0; i<translation_array.length; i++) {
		let tag = translation_array[i].TAG;
		if (GLOBAL.TRANSLATIONS[tag]) {
			console.warn("WARNING: Translation tag", tag,
				"already defined in:", GLOBAL.TRANSLATIONS[tag],
				" Changing to:", translation_array[i]);
		}
		GLOBAL.TRANSLATIONS[tag] = translation_array[i];
	}

}());

