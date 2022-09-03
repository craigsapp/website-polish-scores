{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Sep  3 15:34:08 CEST 2022
// Last Modified: Sat Sep  3 15:34:11 CEST 2022
// Filename:      _includes/browse/getComposerMatch.js
// Used by:
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Get the best match for a composer CGI input.
//
{% endcomment %}

POPC2.prototype.getComposerMatch = function (input, index) {
	this.DebugMessageFunctionVerbose();

	if (!index) {
		index = this.VARS.SEARCH_INDEX;
	}

	let comps = {};
	if (index.length === this.VARS.SEARCH_INDEX.length) {
			// Use cached composer counts
			comps = this.VARS.BROWSE_MENU_OPTIONS.composer;
	} else {
		for (let i=0; i<index.length; i++) {
			let com = index[i].COM;
			if (!comps[com]) {
				comps[com] = 1;
			} else {
				comps[com]++;
			}
		}
	}

	if (comps[input]) {
		return input;
	}

	let re = new RegExp(`^${input}\\b`, "i");
	for (let p in comps) {
		if (re.test(p)) {
			return p;
		}
	}

	let re2 = new RegExp(`^${input}`, "i");
	for (let p in comps) {
		if (re2.test(p)) {
			return p;
		}
	}

	// Search not at the start of the composer names as last guess.
	let re3 = new RegExp(`${input}`, "i");
	for (let p in comps) {
		if (re3.test(p)) {
			return p;
		}
	}

	// Consider searching without accents.

	return "";

};

Object.defineProperty(POPC2.prototype.getComposerMatch, "name", { value: "getComposerMatch" });



