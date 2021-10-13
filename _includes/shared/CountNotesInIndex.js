{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct  8 01:33:00 PDT 2021
// Last Modified: Fri Oct  8 01:33:02 PDT 2021
// Filename:      _includes/shared/CountNotesInIndex.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Checks if the given language is known.  Currently the two
//                known languages are "EN" and "PL".  The known languages are
//                stored in _config.yml in the languages variable.  The language
//                code must be uppercase.
//
{% endcomment %}

POPC2.prototype.CountNotesInIndex = function (index) {
	this.DebugMessageFunction();
	if (!index) {
		index = this.VARS.SEARCH_RESULTS;
	}
	let count = 0;
	for (let i=0; i<index.length; i++) {
		if (index[i].notecount) {
			if (index[i].notecount.match(/^\s*\d/)) {
				count += parseInt(index[i].notecount);
			}
		}
	}
	return count;
};

Object.defineProperty(POPC2.prototype.CountNotesInIndex, "name", { value: "CountNotesInIndex" });



