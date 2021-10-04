// vim: ts=3


//////////////////////////////
//
// getTranslation -- Returns the translation using the given language in the
//    lookup list.  If no language is given, the the LANGUAGE variable will be
//    used.  If there is no entry for a given tag, then the English one is tried,
//    and then the Polish one.  If no translation is available, then the tag is
//    returned;
//

function getTranslation(tag, lang, lookup) {
	if (!tag) {
		return "";
	}
	if (!lang) {
		lang = LANGUAGE;
	}
	if (!lang) {
		lang = "EN";
	}
	if (!lookup) {
		lookup = TRANSLATIONS;
	}
	let entry = lookup[tag];
	let output = "";
	if (entry && (typeof entry[lang] !== "undefined")) {
		output = entry[lang];
	}
	if (!output) {
		if (entry && (typeof entry.EN !== "undefined")) {
			output = entry.EN;
		}
	}
	if (!output) {
		if (entry && (typeof entry.PL !== "undefined")) {
			output = entry.PL;
		}
	}
	if (!output) {
		output = tag.replace(/_/g, " ");
	}
	if (!output) {
		output = "";
	}
	return output;
}



