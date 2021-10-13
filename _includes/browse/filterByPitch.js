{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Oct 11 18:04:14 PDT 2021
// Last Modified: Mon Oct 11 18:04:17 PDT 2021
// Filename:      _includes/browse/filterByPitch.js
// Used by:       _includes/browse/doBrowseSearch.js
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:
//
{% endcomment %}

POPC2.prototype.filterByPitch = function (input) {
	this.DebugMessageFunctionVerbose();
	let type = "pitch";
	let field = "_pitch";
	if (!input) {
		return [];
	}
	if (input.length == 0) {
		return input;
	}
	let element = document.querySelector(`input.filter.${type}`);
	let target = "";
	if (element) {
		target = element.value;
	}

	// Phrases are not allowed in pitch search, but pretend they are.
	let dirty = target;
	let clean = this.sanitizePitchQuery(target);

	if (clean.length > 0) {
		this.VARS.SEARCH[type] = dirty;
		let output = [];
		let re = new RegExp(clean, "i");
		for (let i=0; i<input.length; i++) {
			if (re.exec(input[i][field])) {
				output.push(input[i]);
			}
		}
		return output;
	}
	return input;
};

Object.defineProperty(POPC2.prototype.filterByPitch, "name", { value: "filterByPitch" });



