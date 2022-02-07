{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/filterByMode.js
// Used by:       _includes/browse/doBrowseSearch.js
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:
//
{% endcomment %}

POPC2.prototype.filterByMode = function (input) {
	this.DebugMessageFunctionVerbose();
	let type = "mode";
	let field = "key";
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
		this.VARS.SEARCH[type] = target;
		let output = [];
		let re;
		if (target === "maj") {
			re = new RegExp("^[A-G]");
		} else if (target === "min") {
			re = new RegExp("^[a-g]");
		} else {
console.error("MODE TARGET", target);
			re = new RegExp("\\b" + target + "\\b");
		}
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

Object.defineProperty(POPC2.prototype.filterByMode, "name", { value: "filterByMode" });



