{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Sun Oct 10 17:29:42 PDT 2021
// Filename:      _includes/browse/filterByComposer.js
// Used by:       _includes/browse/doBrowseSearch.js
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Search VARS.SCORE_INDEX for entries composed by the specified
//                composer.  If the entire SCORE_INDEX will be searched and if
//                VARS.COMPOSER_INDEX is available and a ._worklist entry has been
//                prepared for the composer, then return that worklist; otherwise,
//                the SCORE_INDEX will be searched for entries by the composer.
//                Do this search first from the browse searching form, since this
//                will speed up the searching a bit when a composer is involved.
//
{% endcomment %}

POPC2.prototype.filterByComposer = function (input) {
	this.DebugMessageFunction();
	let type = "composer";
	let field = "COM";
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
		this.VARS.SEARCH.composer = target;

		if ((input.length == this.VARS.SCORE_INDEX.length)
				&& !this.IsEmptyObject(this.VARS.COMPOSER_INDEX)) {
			// Used the prepared composer worklist if available:
			let composerEntry = this.VARS.COMPOSER_INDEX[target];
			let worklist = composerEntry._worklist;
			if (worklist) {
				return worklist;
			}
		}

		this.VARS.SEARCH[type] = target;
		let output = [];
		for (let i=0; i<input.length; i++) {
			let entry = input[i];
			if (entry[field] === target) {
				output.push(entry);
			}
		}
		return output;
	}

	return input;
};

Object.defineProperty(POPC2.prototype.filterByComposer, "name", { value: "filterByComposer" });



