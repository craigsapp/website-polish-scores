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
//                into GLOBAL.COMPOSERS global variable.
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
			that.GLOBAL.COMPOSERS = {};
			for (let i=0; i<data.length; i++) {
				let COM = data[i].COM;
				if (!COM) {
					continue;
				}
				if (COM.match(/^\s*$/)) {
					continue;
				}
			}
			// Create a list of the composers, including counts of files for the
			// composer and links into the COMPSERS database entry for the composer
			that.DebugMessage("DOWNLOADED COMPOSER INDEX FROM " + url, "purple");
			that.displayComposerBrowsePortrait();
		})
		.catch(err => { console.error(err); });
};

Object.defineProperty(POPC2.prototype.downloadComposerIndex, "name", { value: "downloadComposerIndex" });



