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
	fetch(url)
		.then(res => res.json())
		.then(data => {
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
				that.VARS.COMPOSER_INDEX[COM]._worklist.push(entry);
			}

			// Check if there are composers in the SCORE_INDEX that are
			// not in the COMPOSER_INDEX.

			that.DebugMessage("DOWNLOADED COMPOSER INDEX FROM " + url, "purple");
			that.displayComposerBrowsePortrait();
		})
		.catch(err => { console.error(err); });
};

Object.defineProperty(POPC2.prototype.downloadComposerIndex, "name", { value: "downloadComposerIndex" });



