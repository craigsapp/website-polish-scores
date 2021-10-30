{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/browse/filterByTitle.js
// Used by:       _includes/browse/doBrowseSearch.js
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:
//
{% endcomment %}

POPC2.prototype.filterByTitle = function (input) {
	this.DebugMessageFunctionVerbose();
	let type = "title";
	let field = "_title";
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

	target = target.trim();
	let pieces = target.replace(/-"/g, '"-').split(/\s*"+\s*/);
	let titleTargets = [];
	for (let i=0; i<pieces.length; i++) {
		pieces[i] = pieces[i].trim();
		if (i % 2 == 0) {
			let newpieces = pieces[i].split(/\s+/);
			for (let j=0; j<newpieces.length; j++) {
				newpieces[j] = newpieces[j].replace(/^\s*-\s*$/, "");
				if (newpieces[j]) {
					titleTargets.push(newpieces[j]);
				}
			}
		} else {
			// Exact phrase to search for:
			if (pieces[i]) {
				titleTargets.push(pieces[i]);
			}
		}
	}

	if (titleTargets.length > 0) {
		this.VARS.SEARCH[type] = target;
		let output = [];
		for (let i=0; i<titleTargets.length; i++) {
			let negate = false;
			let searchString = titleTargets[i];
			let matches = searchString.match(/^-(.*)/);
			if (matches) {
				negate = true;
				searchString = matches[1];
			}
			let re = new RegExp(searchString, "i");
			for (let j=0; j<input.length; j++) {
				if (negate) {
					if (!re.exec(input[j][field])) {
						output.push(input[j]);
					}
				} else {
					if (re.exec(input[j][field])) {
						output.push(input[j]);
					}
				}
			}
			if (i < titleTargets.length - 1) {
				input = output;
				output = [];
			}
		}
		return output;
	} else {
		return input;
	}
};

Object.defineProperty(POPC2.prototype.filterByTitle, "name", { value: "filterByTitle" });



