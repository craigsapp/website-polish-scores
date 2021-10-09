{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct  8 01:33:00 PDT 2021
// Last Modified: Fri Oct  8 01:33:02 PDT 2021
// Filename:      _includes/shared/IsValidLanguage.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Checks if the given language is known.  Currently the two
//                known languages are "EN" and "PL".  The known languages are
//                stored in _config.yml in the languages variable.  The language
//                code must be uppercase.
//
{% endcomment %}

POPC2.prototype.IsValidLanguage = function (lang) {
	this.DebugMessageFunction(lang);
	let validLanguages = this.SETTINGS.languages;
	for (let i=0; i<validLanguages.length; i++) {
		if (lang === validLanguages[i]) {
			return true;
		}
	}
	console.error("Unknown language:", lang);
	return false;
};

Object.defineProperty(POPC2.prototype.IsValidLanguage, "name", { value: "IsValidLanguage" });



