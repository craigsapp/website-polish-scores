{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 19:21:31 PDT 2021
// Last Modified: Thu Oct  7 23:13:20 PDT 2021
// Filename:      _includes/shared/GetLanguageFromBrowser.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Get the language preference from navigator.language.
//                If the language is not Polish or English, then set
//                it to English.
//
{% endcomment %}

POPC2.prototype.GetLanguageFromBrowser = function () {
	this.DebugMessageFunction();
	if (navigator.language.match(/\ben\b/i)) {
		return "EN";
	} else if (navigator.language.match(/\bpl\b/i)) {
		return "PL";
	} else {
		return "EN";
	}
};

Object.defineProperty(POPC2.prototype.GetLanguageFromBrowser, "name", { value: "GetLanguageFromBrowser" });



