{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Thu Feb 10 21:00:28 PST 2022
// Last Modified: Thu Feb 10 21:00:30 PST 2022
// Filename:      _includes/listeners/downloadInstrumentIndex.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Download the instrument index and store its contents
//                into VARS.INSTRUMENT_INDEX global variable.
//
{% endcomment %}

POPC2.prototype.downloadInstrumentIndex = function () {
	this.DebugMessageFunction();
	let url = this.SETTINGS.instrument_index;
	this.DebugMessage("DOWNLOADING INSTRUMENT INDEX FROM " + url, "lightblue");
	let that = this;
	fetch(url)
		.then(res => res.json())
		.then(data => {
			that.VARS.INSTRUMENT_INDEX = data;
			if (!this.VARS.TRANSLATIONS) {
				console.error("NO TRANSLATIONS DATABASE FOR INSTRUMENT CODES");
			} else {
				// Store instrument code translations.
				for (property in data) {
					let entry = {};
					entry.TAG = property;
					entry.EN = data[property]["EN"];
					entry.PL = data[property]["PL"];
					this.VARS.TRANSLATIONS[entry.TAG] = entry;
				}
			}

			that.DebugMessage("DOWNLOADED INSTRUMENT INDEX FROM " + url, "lightblue");
		})
		.catch(err => { console.error("downloadInstrumentIndex:", err); });
};

Object.defineProperty(POPC2.prototype.downloadInstrumentIndex, "name", { value: "downloadInstrumentIndex" });



