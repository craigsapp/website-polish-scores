// vim: ts=3

let atondata = document.querySelector("script#translations").textContent;
let aton = new ATON;
let TRANSARRAY = aton.parse(atondata).ENTRY;

if (!Array.isArray(TRANSARRAY)) {
	// If only one entry in translation array, convert object to array:
	TRANSARRAY = [ TRANSARRAY ];
}

// TRANSLATIONS: lookup index into translations by TAG entries.
let TRANSLATIONS = {};

for (let i=0; i<TRANSARRAY.length; i++) {
	let tag = TRANSARRAY[i].TAG;
	TRANSLATIONS[tag] = TRANSARRAY[i];
	// Maybe check here for duplicate tags.
}



