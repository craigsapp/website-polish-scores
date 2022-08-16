{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Aug 16 10:42:04 CEST 2022
// Last Modified: Tue Aug 16 10:42:07 CEST 2022
// Filename:      _includes/shared/GetPmsIds.js
// Used by:
// Included in:   _includes/shared/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Extract list of fileids for a given pmsid.
//
{% endcomment %}

POPC2.prototype.GetPmsIds = function (pmsscope, pmsnum, scoreindex) {
	this.DebugMessageFunction(pmsscope, pmsnum);
	if (!scoreindex) {
		return [];
	}

	let full = `${pmsscope}${pmsnum}`;
	let output = [];
	let si = scoreindex;
	for (let i=0; i<si.length; i++) {
		if (!si[i].pmsid) {
			continue;
		}
		if (si[i].pmsid === full) {
			output.push(si[i].fileid);
		}
	}

	return output;
};

Object.defineProperty(POPC2.prototype.GetPmsIds, "name", { value: "GetPmsIds" });



