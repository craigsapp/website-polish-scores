{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Mon Nov  1 21:57:35 PDT 2021
// Filename:      _includes/browse/MakeComposerDates.js
// Used by:
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Take Humdrum-formatted birth and death dates
//                and create a date range to display on a webpage
//                Currently processes cases where a specific or approx.
//                year for both birth and death are known; otherwise,
//                returns an empty string.
//
{% endcomment %}

POPC2.prototype.MakeComposerDates = function (birth, death) {
	this.DebugMessageFunction(birth, death);
	// Currently require both birth and death dates.
	if (!birth) {
		return "";
	}
	if (!death) {
		return "";
	}

	let matches;
	// Check if approximate century specified, such as
	// ~1800-~1899 which means "19th century"
	matches = birth.match(/^~(1[123456789])00$/);
	if (matches) {
		let century = parseInt(matches[1]) + 1;
		matches = death.match(/^~1[23456789]99$/);
		if (matches) {
			// Also set up this date for Polish:
			return `<div class="trans" data-trans="${century}_century">xXx</div>`;
		}
	}

	let output = "";
	let byear = "";
	let dyear = "";

	matches = birth.match(/^(\d{4})/);
	if (matches) {
		byear = matches[1];
	} else {
		matches = birth.match(/^~(\d{4})/);
		if (matches) {
			byear = "<i>c</i>" + matches[1];
		}
	}

	matches = death.match(/^(\d{4})/);
	if (matches) {
		dyear = matches[1];
	} else {
		matches = birth.match(/^~(\d{4})/);
		if (matches) {
			dyear = "<i>c</i>" + matches[1];
		}
	}

	if (byear && dyear) {
		return `${byear}&ndash;${dyear}`;
	} else {
		// Only displaying years when both birth and death are
		// known exactly.
		return "";
	}
};

Object.defineProperty(POPC2.prototype.MakeComposerDates, "name", { value: "MakeComposerDates" });



