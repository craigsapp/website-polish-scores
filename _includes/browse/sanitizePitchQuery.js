{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Oct 11 20:18:01 PDT 2021
// Last Modified: Mon Oct 11 20:18:03 PDT 2021
// Filename:      _includes/browse/sanitizePitchQuery.js
// Used by:       _includes/browse/filterByPitch.js
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Clean up the browse pitch search text to make
//                it compatible with searching in the thema pitch
//                field.
//
{% endcomment %}

POPC2.prototype.sanitizePitchQuery = function (input) {
	this.DebugMessageFunctionVerbose(input);

	if (!input) {
		return "";
	}

	let start = input;

	input = input.replace(/ut/ig,  "C");
	input = input.replace(/do/ig,  "C");
	input = input.replace(/re/ig,  "D");
	input = input.replace(/mi/ig,  "E");
	input = input.replace(/sol/ig, "G");
	input = input.replace(/la/ig,  "A");
	input = input.replace(/si/ig,  "B");
	input = input.replace(/ti/ig,  "B");

	if (input !== start) {
		// Interpret "fa" as solfege since there
		// are other solfege syllables:
		input = input.replace(/\bfa\b/ig,  "F");
	}

	if (this.VARS.LANGUAGE === "PL") {
		// Use German pitch system:
		// Also deal with accidentals after B?
		input = input.replace(/B/i, "B-");
		input = input.replace(/H/i, "B");
	}
	input = input.replace(/\s/g, "");

	let matches = input.match(/([a-g][#n-]*)/gi);
	console.warn("MATCHES", matches);
	let output = "";
	for (let i=0; i<matches.length; i++) {
		let value = matches[i].toUpperCase();
		value = value.replace(/-/g, "b");  // "b" is search-index flat
		if (value.match(/-/)) {
			output += `${value} `;
		} else if (value.match(/#/)) {
			output += `${value} `;
		} else if (value.match(/N/)) {
			output += `${value.replace(/N/ig, "")} `;
		} else {
			output += `${value}[#-]* `;
		}
	}

	this.DebugMessage("SANTIZED PITCH: " + output, "teal");
	return output;
};

Object.defineProperty(POPC2.prototype.sanitizePitchQuery, "name", { value: "sanitizePitchQuery" });



