{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 19:24:32 PDT 2021
// Last Modified: Fri Oct 22 23:05:17 PDT 2021
// Filename:      _includes/keyscape/getTimeRange.js
// Used by:
// Included in:   _includes/keyscape/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Load a keyscape image into the page.
//
{% endcomment %}

POPC2.prototype.getTimeRange = function (qstart, qend) {
	this.DebugMessageFunction(qstart, qend);
	let id = this.VARS.WORK_ID;
	if (!id) {
		return;
	}

	let timemap = this.VARS.TIMEMAP[id];
	if (!timemap) {
		console.warn("Timemap is not available for", id);
	}

	starti = -1;
	endi   = -1;
	for (let i=0; i<timemap.length; i++) {
		if ((starti < 1) && (i > 0)) {
			if (timemap[i].qstamp == qstart) {
				starti = i;
			} else if (timemap[i].qstamp > qstart) {
				starti = i - 1;
			}
		}
		if (endi < 1) {
			if (timemap[i].qstamp == qend) {
				endi = i;
			} else if (timemap[i].qstamp > qend) {
				endi = i;
			}
		}
	}
	if (starti < 0) {
		starti = 0;
	}
	if (endi < 0) {
		endi = timemap.length - 1;
	}

	let entry1 = timemap[starti];
	let entry2 = timemap[endi];

	return {
		"start-time":    entry1.tstamp,
		"end-time":      entry2.tstamp,
		"start-quarter": entry1.qstamp,
		"end-quarter":   entry2.qstamp,
		"click-start":   qstart,
		"click-end":     qend
	};

};

Object.defineProperty(POPC2.prototype.getTimeRange, "name", { value: "getTimeRange" });



