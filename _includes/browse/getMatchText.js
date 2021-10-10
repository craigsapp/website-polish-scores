{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Oct  9 19:25:59 PDT 2021
// Last Modified: Sat Oct  9 19:26:01 PDT 2021
// Filename:      _includes/browse/getMatchText.js
// Used by:       _includes/browse/showResultsCount.js
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Adjust the singular/plural text for "matches"/"match"
//
{% endcomment %}

POPC2.prototype.getMatchText = function (count) {
	this.DebugMessageFunction();

	if (this.GLOBAL.LANGUAGE !== "PL") {
		if (count == 1) {
			return "match";
		} else {
			return "matches"
		}
	}

	if (count == 0) {
		return this.getTranslation("0_matches");
	}
	if ((count == 1)) {
		return this.getTranslation("1_match");
	}
	let hundred = count % 100;
	if (count == 0) {
		return this.getTranslation("0_matches");
	}
	if (count == 1) {
		return this.getTranslation("101_matches");
	}
	if (count >= 5 && count <=21) {
		return this.getTranslation("5-21_matches");
	}
	let tens = count % 10;
	if (tens == 0) {
		return this.getTranslation("0_matches");
	}
	if (tens == 1) {
		return this.getTranslation("5-21_matches");
	}
	if ((tens >= 2) && (tens <= 4)) {
		return this.getTranslation("2-4_matches");
	} else {
		return this.getTranslation("5-21_matches");
	}
};

Object.defineProperty(POPC2.prototype.getMatchText, "name", { value: "getMatchText" });



