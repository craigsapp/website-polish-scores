{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Oct 11 17:23:33 PDT 2021
// Last Modified: Mon Oct 11 17:23:39 PDT 2021
// Filename:      _includes/listeners/downloadPitchIndex.js
// Used by:       _includes/listeners/downloadScoreIndex.js
// Included in:   _includes/listeners/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Download the search index for pitch and insert its
//                contents into VARS.SCORE_INDEX in the .pitch field.
//
{% endcomment %}

POPC2.prototype.downloadPitchIndex = function () {
	this.DebugMessageFunction();
	let url = popc2.SETTINGS.pitch_index;
	this.DebugMessage("DOWNLOADING PITCH INDEX FROM " + url, "magenta");
	let that = this;
	let now = new Date();
	let starttime = now.getTime();

	fetch(url)
		.then(res => res.text())
		.then(data => {
			let now = new Date();
			let endtime = now.getTime();
			let duration = (endtime - starttime)/1000.0;
			let lines = data.split(/\r?\n/);
			let index = {};
			for (let i=0; i<lines.length; i++) {
				let line = lines[i];
				let matches = line.match(/^([^\t:]+):[^\t]*\t(J.*)\s*$/);
				if (matches) {
					if (index[matches[1]]) {
						index[matches[1]] += matches[2] + " \n";
					} else {
						index[matches[1]] = matches[2] + " \n";
					}
				}
			}
			for (let i=0; i<that.VARS.SCORE_INDEX.length; i++) {
				let fileid = that.VARS.SCORE_INDEX[i].fileid;
				if (fileid) {
					let pitch = index[fileid];
					if (pitch) {
						that.VARS.SCORE_INDEX[i]._pitch = pitch;
					}
				}
			}
			if (that.VARS.WORK_ID) {
				// Display of work page handled by downloadComposerIndex().
				// that.displayWorkPage();
			} else {
				if (that.VARS.SEARCH.pitch) {
					// Do an initial browse search, but only if it includes pitch.
					// If no pitch involved, then the search was already done.
					that.displayBrowsePage();
				}
			}
			that.DebugMessage(`DOWNLOADED PITCH INDEX FROM ${url} in ${duration} seconds`, "magenta");
		})
		.catch(err => { console.error(err); });
};

Object.defineProperty(POPC2.prototype.downloadPitchIndex, "name", { value: "downloadPitchIndex" });



