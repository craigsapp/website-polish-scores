{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Oct 11 23:20:01 PDT 2021
// Last Modified: Wed Oct 13 02:13:23 PDT 2021
// Filename:      _includes/work/displayPreviousWork.js
// Used by:
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Display the previous score in the browse list.  Search
//                for the current score in the SEARCH_RESULTS variable
//                and then go to the previous one in the list.
//
{% endcomment %}

POPC2.prototype.displayPreviousWork = function() {
	this.DebugMessageFunction();

	let index = this.sortIndex(this.VARS.SEARCH_RESULTS);
	if (index.length == 0) {
		index = this.VARS.SEARCH_INDEX;
	}
	let targetid = this.VARS.WORK_ID;
	if (!targetid) {
		console.error("NO ACTIVE WORK ID");
		return;
	}

	// Turn of MIDI playback is active for current work:
	stop();

	let obj = this.GetIndexAndTypeInSearchResults(targetid, index);
	let foundi = obj.index;
	let idtype = obj.type;

	if (foundi < 0) {
		console.error("Current ID", targetid, "NOT FOUND IN INDEX", index);
		return;
	}
	if ((!idtype) || (idtype === "unknown")) {
		console.error("Type of Current ID", targetid, "NOT FOUND IN INDEX", index);
		return;
	}

	let previ = foundi - 1;
	if (previ < 0) {
		previ = index.length - 1;
	}
	let id;
	id = index[previ][idtype];
	if (!id) {
		id = index[previ].fileid;
	}
	if (!id) {
		console.error("CANNOT FIND ID FOR PREVIOUS SCORE BEFORE", targetid);
		return;
	}
	this.displayScore(id, {noscroll: true});
};

Object.defineProperty(POPC2.prototype.displayPreviousWork, "name", { value: "displayPreviousWork" });



