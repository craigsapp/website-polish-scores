{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Oct 11 23:20:01 PDT 2021
// Last Modified: Mon Oct 11 23:20:04 PDT 2021
// Filename:      _includes/work/displayNextWork.js
// Used by:
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Display the next score in the browse list.  Search
//                for the current score in the SEARCH_RESULTS variable
//                and then go to the next one in the list.
//
{% endcomment %}

POPC2.prototype.displayNextWork = function() {
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
	let foundi = -1;
	let idtype = "unknown";
	for (let i=0; i<index.length; i++) {
		if (index[i].cenid === targetid) {
			foundi = i;
			idtype = "cenid";
			break;
		}
		if (index[i].fileid === targetid) {
			foundi = i;
			idtype = "fileid";
			break;
		}
		if (index[i].nifcid === targetid) {
			foundi = i;
			idtype = "nifcid";
			break;
		}
	}
	if (foundi < 0) {
		console.error("DID NOT FIND ID", targetid, "IN SCORE LIST");
		return;
	}
	if (idtype === "unknown") {
		console.error("DID NOT FIND ID (B)", targetid, "IN SCORE LIST");
		return;
	}
	let nexti = foundi + 1;
	if (nexti >= index.length) {
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

Object.defineProperty(POPC2.prototype.displayNextWork, "name", { value: "displayNextWork" });



