{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Aug 16 11:06:18 CEST 2022
// Last Modified: Tue Aug 16 11:06:21 CEST 2022
// Filename:      _includes/shared/GetRismIds.js
// Used by:
// Included in:   _includes/shared/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Extract list of fileids for a given rismid.
//
{% endcomment %}

POPC2.prototype.GetRismIds = function (rismid, scoreindex) {
	this.DebugMessageFunction(rismid);
	if (!scoreindex) {
		return [];
	}

	let output = [];
	let si = scoreindex;
	for (let i=0; i<si.length; i++) {
		if (!si[i].rismid) {
			continue;
		}
		if (si[i].rismid === rismid) {
			output.push(si[i].fileid);
		}
	}

	return output;
};

Object.defineProperty(POPC2.prototype.GetRismIds, "name", { value: "GetRismIds" });



