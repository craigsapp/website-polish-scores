{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Jun  5 05:34:13 PDT 2022
// Last Modified: Sun Jun  5 05:34:16 PDT 2022
// Filename:      _includes/timemap/clearElementsInTimemap.js
// Used by:       
// Included in:   _includes/timemap/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Remove eon and eoff properties from entries in the timemap.
//
{% endcomment %}

POPC2.prototype.clearElementsInTimemap = function(timemap) {
	this.DebugMessageFunction();

	if (!timemap) {
		return;
	}

	for (let i=0; i<timemap.length; i++) {
		let entry = timemap[i];
		if (typeof entry.eon !== "undefined") {
			delete entry.eon;
		}
		if (typeof entry.eoff !== "undefined") {
			delete entry.eoff;
		}
	}

};

Object.defineProperty(POPC2.prototype.clearElementsInTimemap, "name", { value: "clearElementsInTimemap" });



