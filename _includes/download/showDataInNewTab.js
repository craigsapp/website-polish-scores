{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Oct 16 17:34:30 PDT 2021
// Last Modified: Sun Oct 31 18:19:26 PDT 2021
// Filename:      _includes/download/showDataInNewTab.js
// Used by:       _includes/download/subpage-download.html
// Included in:   _includes/download/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Show requested data type for work in a new tab.
//
{% endcomment %}

POPC2.prototype.showDataInNewTab = function (event, data_type, location) {
	this.DebugMessageFunction(data_type, location);

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
	// let popc1 = false;
	// let popc2 = true;
	// if (!filename.match(/^pl-/)) {
	// 	popc1 = true;
	// 	popc2 = false;
	// }

	if ((location === "github") && filename) {
		// Display link to file in Github repository
		let matches = filename.match(/^(pl-[a-z]+)/);
		if (matches) {
			// POPC2 source, where scores are organized into siglum folders.
			let siglum = matches[1];
			url = `${this.SETTINGS.github_addr_popc2}/blob/main/${siglum}/kern/${filename}`;
		} else {
			// POPC1 source
			url = `${this.SETTINGS.github_addr_popc2}/blob/main/kern/${filename}`;
		}
	} else if (location === "vhv") {
		let encode = encodeURIComponent(`${this.SETTINGS.data_addr}/${this.VARS.WORK_ID}.${ext2}`);
		url = `https://verovio.humdrum.org/?file=${encode}`;

		let ftext = "";
		let options = this.addNotationConfigureOptions({});
		if (options.filter) {
			let filter = options.filter;
			if (typeof filter === "string") {
				ftext += filter;
			} else {
				for (let i=0; i<filter.length; i++) {
					if (i > 0) {
						ftext += " | ";
					}
					ftext += filter[i];
				}
			}
		}
		if (ftext) {
			url += `&filter=${encodeURIComponent(ftext)}`;
		}
	} else {
		url = `${this.SETTINGS.data_addr}/${this.VARS.WORK_ID}.${ext2}`;
	}

	if (location === "copy") {
		console.warn("COPYING FILE");
		fetch(url)
			.then(res => res.text())
			.then(text => {
				// Include options from the notation configuration menu:
				let options = this.addNotationConfigureOptions({});
				if (options.filter) {
					let filter = options.filter;
					if (typeof filter === "string") {
						text += `!!!filter: ${filter}\n`;
					} else {
						for (let i=0; i<filter.length; i++) {
							text += `!!!filter: ${filter[i]}\n`;
						}
					}
				}
				this.CopyToClipboard(text);
			})
			.catch(err => console.error(err));
	} else {
		if (url) {
			window.open(url, "_blank");
		}
	}

	event.preventDefault();
	event.stopPropagation();
};

Object.defineProperty(POPC2.prototype.showDataInNewTab, "name", { value: "showDataInNewTab" });



