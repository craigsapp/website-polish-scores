{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Oct 25 08:48:01 PDT 2021
// Last Modified: Mon Oct 25 08:48:04 PDT 2021
// Filename:      _includes/keyscape/getQuarterNoteRange.js
// Used by:
// Included in:   _includes/keyscape/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Get the starting/ending time of a selected region in a 
//                keyscape in units of quarter notes. Returns -1 for start
//                and end if there is a problem.
//
{% endcomment %}

POPC2.prototype.getQuarterNoteRange = function (startpx, endpx) {
	this.DebugMessageFunction(startpx, endpx);
	let output = {qstart: -1, qend: -1};
	let id = this.VARS.WORK_ID;
	if (!this.VARS.KEYSCAPE_INFO[id]) {
		return output;
	}
	if (this.VARS.KEYSCAPE_INFO[id].length != 300) {
		return output;
	}

	// Keyscape is displayed in 2:1 aspect ratio, so convert to 1:1:
	let startcol = parseInt(startpx / 2)
	let endcol   = parseInt(endpx / 2)
	if (endcol >= 300) { endcol = 299; }
	if (startcol < 0)  { startcol = 0; }

	if (typeof this.VARS.KEYSCAPE_INFO[id][startcol].qstart === "undefined") {
		return output;
	}
	let qstart = this.VARS.KEYSCAPE_INFO[id][startcol].qstart;

	if (typeof this.VARS.KEYSCAPE_INFO[id][endcol].qend === "undefined") {
		return;
	}
	let qend = this.VARS.KEYSCAPE_INFO[id][endcol].qend;

	output.qstart = qstart;
	output.qend = qend;
	return output;
}

Object.defineProperty(POPC2.prototype.getQuarterNoteRange, "name", { value: "getQuarterNoteRange" });



