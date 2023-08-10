{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Oct 30 20:07:46 PDT 2021
// Last Modified: Sat Oct 30 20:07:48 PDT 2021
// Filename:      _includes/browse/svgFontCallback.js
// Used by:       
// Included in:   _includes/pdf/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Substitute SVG fonts with PDF fonts.
//
{% endcomment %}


POPC2.prototype.svgFontCallback = function (family, bold, italic, options) {
	if (family == "VerovioText") {
		return family;
	}
	if (family == "Leipzig") {
		return family;
	}
	if (family.match(/(?:^|,)\s*sans-serif\s*$/) || true) {
		if (bold) {
			return (italic) ? "TimesBoldItalic" : "TimesBold";
		} else {
			return (italic) ? "TimesItalic" : "Times";
		};
	}
}

Object.defineProperty(POPC2.prototype.svgFontCallback, "name", { value: "svgFontCallback" });



