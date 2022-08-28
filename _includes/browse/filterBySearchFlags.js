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
	if (fields.IIIF)   { pattern += ".*I"; count++; }
	if (fields.MODERN) { pattern += ".*M"; count++; }
	if (fields.SINGLE) { pattern += ".*S"; count++; }
	if (fields.TEXT)   { pattern += ".*T"; count++; }

	if (count > 0) {
		this.VARS.SEARCH["prefilter"] = pattern;
		let output = [];
		let re = new RegExp(pattern);
		for (let i=0; i<input.length; i++) {
			if (input[i][field] && re.exec(input[i][field])) {
				output.push(input[i]);
			}
		}
		return output;
	} else {
		return input;
	}
};

Object.defineProperty(POPC2.prototype.filterBySearchFlags, "name", { value: "filterBySearchFlags" });



