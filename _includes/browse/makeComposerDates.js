{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/makeComposerDates.js
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

POPC2.prototype.makeComposerDates = function (birth, death) {
	// Currently require both birth and death dates.
	if (!birth) {
		return "";
	}
	if (!death) {
		return "";
	}

	let output = "";
	let byear = "";
	let dyear = "";

	let matches = birth.match(/^(\d{4})/);
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



