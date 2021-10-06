// vim: ts=3:nowrap


//////////////////////////////
//
// trans Handlebar helper -- Interface to provide translations from various
//     languages.  The global LANGUAGE variable controls which language to
//     generate.
//

Handlebars.registerHelper("trans", function(tag) {
	if (!tag) {
		return new Handlebars.SafeString("");
	}
	let lang = GLOBAL.LANGUAGE;
	if (!lang) {
		lang = "EN";
	}
	let item = GLOBAL.TRANSLATIONS[tag];
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



