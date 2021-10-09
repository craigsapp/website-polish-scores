{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct  8 11:01:21 PDT 2021
// Last Modified: Fri Oct  8 11:01:24 PDT 2021
// Filename:      _includes/translations/setup.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Load the translations into a lookup table indexed by the
//                translation tag.
//
{% endcomment %}

(function() {
	popc2.DebugMessage("PREPARING TRANSLATIONS", "seagreen");

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
		if (popc2.GLOBAL.TRANSLATIONS[tag]) {
			popc2.DebugMessage("WARNING: Translation tag " + tag +
				" already defined in: " + JSON.stringify(popc2.GLOBAL.TRANSLATIONS[tag]) +
				". Changing to:" + JSON.stringify(translation_array[i]), "seagreen");
		}
		popc2.GLOBAL.TRANSLATIONS[tag] = translation_array[i];
	}
}());



