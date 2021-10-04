// vim: ts=3


//////////////////////////////
//
// trans Handlebar helper -- Interface to provide translations from various
//     languages.  The global LANGUAGE variable controls which language to
//     generate.
//

Handlebars.registerHelper("trans", function(tag) {
console.log("TAG", tag);
	if (!tag) {
		return new Handlebars.SafeString("");
	}
	let lang = LANGUAGE;
	if (!lang) {
		lang = "EN";
	}
console.log("TRANSLATIONS", TRANSLATIONS);
	let item = TRANSLATIONS[tag];
console.log("ITEM", item);
	if (!item) {
		return new Handlebars.SafeString("");
	}
	let output = item[lang];
	if (!output) {
		// default to EN if desired language does not have a translation.
		output = item.EN;
	}
	if (!output) {
		// default to PL if desired language still does not have a translation.
		output = item.PL;
	}
	if (!output) {
		output = "";
	}
	return new Handlebars.SafeString(output);
});



