{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Aug  9 17:28:07 CEST 2022
// Last Modified: Tue Aug  9 17:28:10 CEST 2022
// Filename:      _includes/work/storeHumdrumReferenceRecordsInIndex.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Store extracted Humdrum reference records in metadata
//                index.
//
{% endcomment %}

POPC2.prototype.storeHumdrumReferenceRecordsInIndex = function(fileid, refs) {
	this.DebugMessageFunction();

	let si = this.VARS.SCORE_INDEX;
	let entry = null;
	if (!si) {
		console.error("NO SCORE INDEX");
		return;
	}
	let filebase = fileid.replace(/_.*/, "");
	for (let i=0; i<si.length; i++) {
		let id = si[i].fileid;
		if (!id) {
			continue;
		}
		if (filebase === id) {
			entry = si[i];
			break;
		}
	}
	if (!entry) {
		console.error("Error: could not find score entry for", fileid);
		return;
	}

	entry.humdrum = refs;
	this.processHumdrumRecordsForWorkPage(entry);

};

Object.defineProperty(POPC2.prototype.storeHumdrumReferenceRecordsInIndex, "name", { value: "storeHumdrumReferenceRecordsInIndex" });



