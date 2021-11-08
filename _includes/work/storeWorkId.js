{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Oct 19 21:34:57 PDT 2021
// Last Modified: Tue Oct 19 21:34:59 PDT 2021
// Filename:      _includes/work/storeWorkId.js
// Used by:
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Store the work ID of the currently displayed score and
//                record the score in the work display history.
//
{% endcomment %}

POPC2.prototype.storeWorkId = function (id) {
	if (!id) {
		return;
	}
	this.VARS.WORK_ID = id;
	let entryi = this.GetIndexInSearchResults(id, this.VARS.SCORE_INDEX);
	if (entryi < 0) {
		return;
	}
	let entry = this.VARS.SCORE_INDEX[entryi];
	let len = this.VARS.WORK_HISTORY.length;
	if (len > 0) {
		if (entry.fileid !== this.VARS.WORK_HISTORY[len - 1]) {
			// Don't store if duplicate of the last entry
			this.VARS.WORK_HISTORY.push(entry);
		}
	} else {
		this.VARS.WORK_HISTORY.push(entry);
	}

	let helement = document.querySelector("#history-browse-button");
	if (helement) {
		if (this.VARS.WORK_HISTORY && (this.VARS.WORK_HISTORY.length > 0)) {
			helement.classList.remove("hidden");
		} else{
			helement.classList.add("hidden");
		}
	}
};

Object.defineProperty(POPC2.prototype.storeWorkId, "name", { value: "storeWorkId" });



