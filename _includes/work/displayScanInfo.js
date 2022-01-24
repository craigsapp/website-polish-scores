{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Jan 23 20:17:32 PST 2022
// Last Modified: Sun Jan 23 20:32:07 PST 2022
// Filename:      _includes/work/displayWorkInfo.js
// Used by:       _includes/work/displayScore.js
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Display any scan links embedded in the score.  A future enhancement
//                would be to check if the same score has already been processed for
//                scan links in score.
//
{% endcomment %}

POPC2.prototype.displayScanInfo = function(humdrum) {
	this.DebugMessageFunction();
	if (!humdrum) {
		humdrum = this.getHumdrumFromPage();
	}
	let scanElement = document.querySelector("#work-scans");
	if (!scanElement) {
		return;
	}
	if (!humdrum) {
		scanElement.innerHTML = "";
	}

	let lines = humdrum.split(/\r?\n/);
	let links = [];
	for (let i=0; i<lines.length; i++) {
		matches = lines[i].match(/^!!!URL-scan[^:]*\s*:\s*([^\s]+)\s*(.*)\s*$/);
		if (!matches) {
			continue;
		}
		let entry = {};
		entry.url = matches[1];
		entry.title = matches[2];
		links.push(entry);
	}

	if (links.length == 0) {
		scanElement.innerHTML = "";
		return;
	}

	// create scan contents from links
	let output = "";
	for (let i=0; i<links.length; i++) {
		if (links[i].title) {
			output += `<a target="_blank" class="trans image-scan" data-transatt="title:${links[i].title}" href="${links[i].url}"><span class="fas fa-picture-o"></span></a> `;
		} else {
			output += `<a target="_blank" class="image-scan" href="${links[i].url}"><span class="fas fa-picture-o"></span></a> `;
		}
	}

	scanElement.innerHTML = output;

	this.ApplyElementTranslations(scanElement);

};

Object.defineProperty(POPC2.prototype.displayScanInfo, "name", { value: "displayScanInfo" });



