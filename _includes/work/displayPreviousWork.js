{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Oct 11 23:20:01 PDT 2021
// Last Modified: Tue Oct 12 19:18:45 PDT 2021
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
	let index = this.VARS.SEARCH_RESULTS;
	if (index.length == 0) {
		index = this.VARS.SCORE_INDEX;
	}
	let targetid = this.VARS.WORK_ID;
	if (!targetid) {
		console.error("NO ACTIVE WORK ID");
		return;
	}

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

	let nexti = foundi + 1;
	if (nexti >= index.length - 1) {
		nexti = 0;
	}
	let id;
	id = index[nexti][idtype];
	if (!id) {
		id = index[nexti].fileid;
	}
	if (!id) {
		console.error("CANNOT FIND ID FOR NEXT SCORE AFTER", targetid);
		return;
	}
	this.displayScore(id);
};

Object.defineProperty(POPC2.prototype.displayPreviousWork, "name", { value: "displayPreviousWork" });



