{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/filterBySearchFlags.js
// Used by:       _includes/browse/doBrowseSearch.js
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:
//
{% endcomment %}

POPC2.prototype.filterBySearchFlags = function (input) {
	this.DebugMessageFunctionVerbose();

	let field = "flags";
	let fields = this.VARS.SEARCH_FLAGS;
	if (!fields) {
		return input;
	}

	// Flags expected to be in alphabetical order:
	// IIIF
	// MODERN
	// SINGLE
	// TEXT
	let pattern = "";
	let count = 0;
	let count2 = 0;
	if (fields.IIIF)   { pattern += ".*I"; count++; }
	if (fields.MODERN) { pattern += ".*M"; count++; }
	if (fields.SINGLE) { pattern += ".*S"; count++; }
	if (fields.TEXT == 1) { pattern += ".*T"; count++; }
	if (fields.TEXT == 2) { count2++; }

	if ((count == 0) && (count2 == 0)) {
		return input;
	}

	let output  = [];
	if (count > 0) {
		this.VARS.SEARCH["prefilter"] = pattern;
		let re = new RegExp(pattern);
		for (let i=0; i<input.length; i++) {
			if (input[i][field] && re.exec(input[i][field])) {
				output.push(input[i]);
			}
		}
	} else {
		output = input;
	}

	// Negation of TEXT search:
	if (count2 > 0) {
		let input2 = output;
		output = [];
		let re = new RegExp("T");
		for (let i=0; i<input2.length; i++) {
			if (input2[i][field] && !re.exec(input2[i][field])) {
				output.push(input2[i]);
			}
		}
	}

	return output;
};


Object.defineProperty(POPC2.prototype.filterBySearchFlags, "name", { value: "filterBySearchFlags" });



