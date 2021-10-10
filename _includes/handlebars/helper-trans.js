{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct  8 23:22:31 PDT 2021
// Last Modified: Fri Oct  8 23:22:34 PDT 2021
// Filename:      _includes/handlebars/helper-trans.js
// Used by:
// Included in:   _includes/handlebars/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Interface to provide translations from various
//                languages.  The VARS.LANGUAGE variable controls
//                which language to generate.
//
{% endcomment %}

Handlebars.registerHelper("trans", function(tag) {
	if (!tag) {
		return new Handlebars.SafeString("");
	}
	let lang = popc2.VARS.LANGUAGE;
	if (!lang) {
		lang = "EN";
	}
	let item = popc2.VARS.TRANSLATIONS[tag];
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



