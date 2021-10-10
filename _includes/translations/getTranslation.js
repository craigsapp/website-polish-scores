{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct  8 11:01:21 PDT 2021
// Last Modified: Fri Oct  8 11:01:24 PDT 2021
// Filename:      _includes/translations/getTranslation.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Returns the translation using the given language
//                in the lookup list.  If no language is given,
//                the popc2.VARS.LANGUAGE variable will be used.
//                If there is no entry for a given tag, then the
//                English one is tried, and then the Polish one.
//                If no translation is available, then the tag is
//                returned;
//
{% endcomment %}

POPC2.prototype.getTranslation = function (tag, lang, lookup) {
	this.DebugMessageFunctionVerbose();
	if (!tag) {
		return "";
	}
	if (!lang) {
		lang = this.VARS.LANGUAGE;
	}
	if (!lang) {
		lang = "EN";
	}
	if (!lookup) {
		lookup = this.VARS.TRANSLATIONS;
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
};

Object.defineProperty(POPC2.prototype.getTranslation, "name", { value: "getTranslation" });



