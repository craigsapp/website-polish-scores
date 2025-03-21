{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 20:03:37 PDT 2021
// Last Modified: Wed Oct  6 20:03:40 PDT 2021
// Filename:      _includes/listeners/downloadComposerIndex.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Download the composer index and store its contents
//                into VARS.COMPOSER_INDEX global variable.
//
{% endcomment %}

POPC2.prototype.downloadComposerIndex = function () {
	this.DebugMessageFunction();
	let url = this.SETTINGS.composer_index;
	this.DebugMessage("DOWNLOADING COMPOSER INDEX FROM " + url, "purple");
	let that = this;
	let now = new Date();
	let starttime = now.getTime();

	fetch(url)
		.then(res => res.json())
		.then(data => {
			let now = new Date();
			let endtime = now.getTime();
			let duration = (endtime - starttime)/1000.0;
			// convert data to associative array
			that.VARS.COMPOSER_INDEX = {};
			for (let i=0; i<data.length; i++) {
				let COM = data[i].COM;
				if (!COM) {
					continue;
				}
				if (COM.match(/^\s*$/)) {
					continue;
				}
				that.VARS.COMPOSER_INDEX[COM] = data[i];
				that.VARS.COMPOSER_INDEX[COM]._worklist = [];
			}
			// Incorporate SCORE_INDEX entries into composer's worklist.
			// And give a reverse link to the composer's entry in the browse index.
			for (let i=0; i<that.VARS.SCORE_INDEX.length; i++) {
				let entry = that.VARS.SCORE_INDEX[i];
				let COM = entry.COM;
            entry._composer_info = that.VARS.COMPOSER_INDEX[COM];
				if (that.VARS.COMPOSER_INDEX[COM]) {
					// The above check is needed in case there is a composer
					// that is not in the composer index.
					if (that.VARS.COMPOSER_INDEX[COM]._worklist) {
						that.VARS.COMPOSER_INDEX[COM]._worklist.push(entry);
					} else {
						that.VARS.COMPOSER_INDEX[COM]._worklist = [entry];
					}
				}
			}

			// Check if there are composers in the SCORE_INDEX that are
			// not in the COMPOSER_INDEX and print some warnings here.

			that.DebugMessage(`DOWNLOADED COMPOSER INDEX FROM ${url} in ${duration} seconds`, "purple");
			if (that.VARS.WORK_ID) {
				that.displayWorkPage(null, {nomidistop: true});
			} else {
				that.DisplayComposerPortrait();
				that.DisplayLibraryPortrait();
			}
		})
		.catch(err => { console.error(err); });
};

Object.defineProperty(POPC2.prototype.downloadComposerIndex, "name", { value: "downloadComposerIndex" });



