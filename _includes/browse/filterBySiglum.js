{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/filterBySiglum.js
// Used by:       _includes/browse/doBrowseSearch.js
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:
//
{% endcomment %}

POPC2.prototype.filterBySiglum = function (input) {
	this.DebugMessageFunctionVerbose();
	let type = "siglum";
	let field = "siglum";
	if (!input) {
		return [];
	}
	if (input.length == 0) {
		return input;
	}
	let element = document.querySelector(`select.filter.${type}`);
	let target = "";
	if (element) {
		target = element.value;
	}
	if (target) {
		this.VARS.SEARCH[type] = target.trim();
		this.VARS.SEARCH_URL.s = target.trim();

		let output = [];
		let re = new RegExp("^" + target + "$");
		for (let i=0; i<input.length; i++) {
			if (re.exec(input[i][field])) {
				output.push(input[i]);
			}
		}
		return output;
	} else {
		return input;
	}
};

Object.defineProperty(POPC2.prototype.filterBySiglum, "name", { value: "filterBySiglum" });



