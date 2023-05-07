{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 19:24:32 PDT 2021
// Last Modified: Mon Apr  4 19:06:02 PDT 2022
// Filename:      _includes/work/displayWorkPage.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Make the work page visible and display the requested work on the page.
//
{% endcomment %}

POPC2.prototype.displayWorkPage = function (id, options) {
	this.DebugMessageFunction(id, options);

	if (!(options && typeof options === 'object' && options.constructor === Object)) {
		options = {};
	}
	let nomidistopQ = options.nomidistop || 0;

	if (!id) {
		id = this.VARS.WORK_ID;
	}
	let matches = id.match(/pms:([a-z]?)(\d+)-?(0*\d*)/);
	if (matches) {
		ids = this.GetPmsIds(matches[1], matches[2], this.VARS.SCORE_INDEX);
		if (ids.length > 0) {
			let subnum = parseInt(matches[3] || 0);
			if ((subnum <= 1) || (subnum >= ids.length)) {
				id = ids[0];
			} else {
				// Maybe look at file id sequence numbers instead due to contiguity.
				id = ids[subnum];
			}
		}
	} else {
		matches = id.match(/rism:(\d+)-?(0*\d*)/);
		if (matches) {
			ids = this.GetRismIds(matches[1], this.VARS.SCORE_INDEX);
			if (ids.length > 0) {
				let subnum = parseInt(matches[2] || 0);
				if ((subnum <= 1) || (subnum >= ids.length)) {
					id = ids[0];
				} else {
					// Maybe look at file id sequence numbers instead due to contiguity.
					id = ids[subnum];
				}
			}
		}
	}
	this.VARS.WORK_ID = id;
	this.ShowPage("work");
	this.ShowWebsiteTitle();
	this.insertBrowseSearchOnWorkPage();
	this.checkForDisplayAnalysis();
	this.displayScore(id, {nomidistop: nomidistopQ});
	this.displayWorkPagination();
	if (this.VARS.RESTORE_TOOLS) {
		this.VARS.RESTORE_TOOLS = false;
		let element = document.querySelector("#tools");
		if (element) {
			element.classList.remove("hidden");
		}
	}
};

Object.defineProperty(POPC2.prototype.displayWorkPage, "name", { value: "displayWorkPage" });



