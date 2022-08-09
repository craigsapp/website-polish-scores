{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Aug  9 17:05:39 CEST 2022
// Last Modified: Tue Aug  9 17:05:42 CEST 2022
// Filename:      _includes/work/storeHumdrumReferenceRecords.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Store a downloaded Humdrum score reference records
//                in metadata for WORK_ID.
//
{% endcomment %}

POPC2.prototype.storeHumdrumReferenceRecords = function(data) {
	this.DebugMessageFunction();
	let lines = data.split("\n");
	let refs = {};
	let matches;
	for (let i=0; i<lines.length; i++) {
		if (matches = lines[i].match(/^!!!([^!:]+)\s*:\s(.*)\s*/)) {
			let index = i;
			let key = matches[1];
			let value = matches[2];
			let entry = {index: index, key: key, value: value};
			if (!refs[key]) {
				refs[key] = [ entry ];
			} else {
				refs[key].push(entry);
			}
		} else if (matches = lines[i].match(/^!!!!SEGMENT\s*:\s*(.*)\s*$/)) {
			let index = i;
			let key = "fileid";
			let value = matches[1];
			value = value.replace(/\.krn$/, "");
			let entry = {index: index, key: key, value: value};
			if (!refs[key]) {
				refs[key] = [ entry ];
			} else {
				refs[key].push(entry);
			}
		}
	}
	let fileids = refs["fileid"];
	if (!fileids) {
		console.warn("Warning: no fileid in data");
		return;
	}
	let fileid = fileids[0].value;
	if (fileid) {
		this.storeHumdrumReferenceRecordsInIndex(fileid, refs);
	}
};

Object.defineProperty(POPC2.prototype.storeHumdrumReferenceRecords, "name", { value: "storeHumdrumReferenceRecords" });



