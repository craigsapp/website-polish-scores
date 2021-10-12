{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Oct 12 07:35:37 PDT 2021
// Last Modified: Tue Oct 12 07:35:39 PDT 2021
// Filename:      _includes/work/displayWorkInfo.js
// Used by:
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Display the composer and title above a score.
//                Change this to get the composer/title info
//                from the Humdrum file rather than the score index.
//
{% endcomment %}

POPC2.prototype.displayWorkInfo = function(id) {
	this.DebugMessageFunction();
	let targetid = id;
	if (!targetid) {
		targetid = this.VARS.WORK_ID;
	}
	if (!targetid) {
		console.error("NO ACTIVE WORK ID");
		return;
	}
	let index = this.VARS.SCORE_INDEX;
	let entry;
	for (let i=0; i<index.length; i++) {
		if (index[i].cenid === targetid) {
			entry = index[i];
			break;
		}
		if (index[i].fileid === targetid) {
			entry = index[i];
			break;
		}
		if (index[i].nifcid === targetid) {
			entry = index[i];
			break;
		}
	}
	if (!entry) {
		console.error("DID NOT FIND ID", targetid, "IN SCORE LIST");
		return;
	}
	let base = document.querySelector("#work-header");
	if (!base) {
		console.error("Error: cannot find #work-header");
	}
	let composerElement = base.querySelector("#composer-name");
	if (composerElement && entry.COM) {
		composerElement.innerHTML = this.FlipName(entry.COM);
	}
	let titleElement = base.querySelector("#title-area");
	let gtlElement = base.querySelector("#GTL");
	let oprElement = base.querySelector("#OPR");
	let otlElement = base.querySelector("#OTL");

	if (titleElement) {
		titleElement.style.display = "none";
		if (gtlElement) {
			gtlElement.style.display = "none";
		}
		if (oprElement) {
			oprElement.style.display = "none";
		}
		if (otlElement) {
			if (entry.title) {
				otlElement.style.display = "block";
				titleElement.style.display = "block";
				otlElement.innerHTML = entry.title;
			} else {
				otlElement.style.display = "none";
			}
		}
	}

};

Object.defineProperty(POPC2.prototype.displayWorkInfo, "name", { value: "displayWorkInfo" });



