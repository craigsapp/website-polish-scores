{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Oct 30 09:11:18 PDT 2021
// Last Modified: Sat Oct 30 09:11:24 PDT 2021
// Filename:      _includes/shared/PrepareDownloadedScoreIndex.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   After the score index has been downloaded from the server,
//                calculate extra parameters for each entry.
//
{% endcomment %}

POPC2.prototype.PrepareDownloadedScoreIndex = function (database) {

	// Generate _title entries from GTL/OPR/OTL
	for (let i=0; i<database.length; i++) {
		let gtl = database[i].GTL;
		let opr = database[i].OPR;
		let otl = database[i].OTL;
		let title = "";

		if (gtl) {
			title = gtl;
		}
		if (opr) {
			if (!title.match(/^\s*$/)) {
				if (opr.match(/^[[]/)) {
					title += ` ${opr}`;
				} else {
					title += ` &mdash; ${opr}`;
				}
			} else {
				title = opr;
			}
		}
		if (otl) {
			if (!title.match(/^\s*$/)) {
				if (otl.match(/^[[]/)) {
					title += ` ${otl}`;
				} else {
					title += ` &mdash; ${otl}`;
				}
			} else {
				title = otl;
			}
		}

		database[i]._title = title;
	}

	// Add ._cenid_seq, ._prev and ._next parameters to browse index:
	for (let i=0; i<database.length; i++) {
		if (typeof database[i].notecount !== "undefined") {
			if (typeof database[i].notecount === "string") {
				if (database[i].notecount.match(/^\s*\d/)) {
					database[i].notecount = parseInt(database[i].notecount);
				}
			}
		}
		database[i]._cenid_seq = i;
		if (i > 0) {
			database[i]._prev = database[i-1];
		}
		if (i < database.length - 1) {
			database[i]._next = database[i+1];
		}
	}
	// Wrap links to next/previous browse entries?
	// database[0]._prev = database[database.length-1];
	// database[database.length-1]._next = database[0];

	popc2.VARS.SCORE_INDEX    = database;
	popc2.VARS.SEARCH_INDEX   = database;
	popc2.VARS.SEARCH_RESULTS = database;

};

Object.defineProperty(POPC2.prototype.PrepareDownloadedScoreIndex, "name", { value: "PrepareDownloadedScoreIndex" });



