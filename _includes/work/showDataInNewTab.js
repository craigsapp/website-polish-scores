{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Oct 16 17:34:30 PDT 2021
// Last Modified: Mon Oct 18 21:36:08 PDT 2021
// Filename:      _includes/work/showDataInNewTab.js
// Used by:       _includes/work/work.html
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Show requested data type for work in a new tab.
//
{% endcomment %}

POPC2.prototype.showDataInNewTab = function (event, data_type, location) {
	this.DebugMessageFunction(data_type);

	let pos = this.GetIndexInSearchResults(this.VARS.WORK_ID, this.VARS.SCORE_INDEX);
	let filebase = this.VARS.SCORE_INDEX[pos].fileid;
	if (!filebase) {
		filebase = this.VARS.WORK_ID;
	}
	if (!filebase) {
		console.error("Error: WORK ID cannot be found", this.VARS.WORK_ID);
		return;
	}

	// Get full filename from Humdrum SEGMENT LINE (if available):
	let filename = "";
	let helement = document.querySelector("#humdrum");
	if (helement) {
		let humdrum = helement.textContent.trim().split(/\r?\n/);
		if (humdrum.length > 0) {
			let matches = humdrum[0].match(/^!!!!SEGMENT:\s*(.*)\s*$/);
			if (matches) {
				filename = matches[1];
				filebase = filename.replace(/\.krn$/i, "");;
			}
		}
	}

	let extension = "";
	if (data_type.match(/hum/i)) {
		extension = "txt";
	} else if (data_type.match(/mei/i)) {
		extension = "mei";
	} else if (data_type.match(/musicxml/i)) {
		extension = "musicxml";
	} else if (data_type.match(/mid/i)) {
		extension = "mid";
	} else if (data_type.match(/pdf/i)) {
		extension = "pdf";
	}
	if (!extension) {
		console.warn("Warning: Unknown file type to download:", data_type);
		return;
	}
	let ext2 = extension.replace("txt", "krn");

	let url;
	if ((location === "github") && filename) {
		// Display link to file in Github repository
		let matches = filename.match(/^(pl-[a-z]+)/);
		if (matches) {
			let siglum = matches[1];
			url = `${this.SETTINGS.popc2_github_addr}/blob/main/${siglum}/kern/${filename}`;
		} else {
			url = `${this.SETTINGS.popc2_github_addr}/blob/main/kern/${filename}`;
		}
	} else if (location === "vhv") {
			let encode = encodeURIComponent(`${this.SETTINGS.data_addr}/${this.VARS.WORK_ID}.${ext2}`);
			url = `https://verovio.humdrum.org/?file=${encode}`;
	} else {
		url = `${this.SETTINGS.data_addr}/${this.VARS.WORK_ID}.${ext2}`;
	}
	if (url) {
		window.open(url, "_blank");
	}

};

Object.defineProperty(POPC2.prototype.showDataInNewTab, "name", { value: "showDataInNewTab" });



