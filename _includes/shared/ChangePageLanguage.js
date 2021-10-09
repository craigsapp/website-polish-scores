{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 19:21:31 PDT 2021
// Last Modified: Thu Oct  7 23:13:20 PDT 2021
// Filename:      _includes/shared/ChangePageLanguage.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Change the language of the currently visible page.  The type parameter can be:
//                   "browse"   == Main browse page.
//                   "work"     == Work page (showing music notation for one movement).
//                   "analysis" == Analysis page.
//                   null       == Set the language for the currently visible page.
//
//
{% endcomment %}

POPC2.prototype.ChangePageLanguage = function (lang, type) {
	this.DebugMessageFunction(lang, type);
	if (!this.IsValidLanguage(lang)) {
		return;
	}
	this.HighlightLanguage(lang);
	this.GLOBAL.LANGUAGE = lang;
	localStorage.LANGUAGE = lang;

	// Change current page to given language

	let pageType = this.GetPageType();

	if (pageType === "browse") {
		this.displayBrowsePage();
	} else if (pageType === "work") {
		this.updateWorkPageLanguage();
	} else {
		console.log("UNKNOWN PAGE TYPE:", pageType);
	}
};

Object.defineProperty(POPC2.prototype.ChangePageLanguage, "name", { value: "ChangePageLanguage" });



