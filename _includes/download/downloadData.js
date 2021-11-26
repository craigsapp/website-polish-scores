{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct 15 21:56:49 PDT 2021
// Last Modified: Fri Nov 26 07:03:31 CET 2021
// Filename:      _includes/work/downloadData.js
// Used by:       _includes/work/work.html
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Download data for the current VARS.WORK_ID id.
//
{% endcomment %}

POPC2.prototype.downloadData = function (event, data_type) {
	this.DebugMessageFunction(data_type);

	if (!event) {
		console.error("Error: missing event in parameters to downloadData");
		return;
	}
	let target = event.target;
	if (target.classList.contains("disabled")) {
		// Do not generate data if download element is disabled.
		return;
	}
	let parent = target.parentNode;
	if (parent.classList.contains("disabled")) {
		// Do not generate data if download element is disabled.
		return;
	}

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
	let helement = document.querySelector("#humdrum");
	if (helement) {
		let humdrum = helement.textContent.trim().split(/\r?\n/);
		if (humdrum.length > 0) {
			let matches = humdrum[0].match(/^!!!!SEGMENT:\s*(.*)\s*$/);
			if (matches) {
				filebase = matches[1].replace(/\.krn$/i, "");;
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
	} else if (data_type.match(/svg/i)) {
		extension = "svg";
	}
	if (!extension) {
		console.warn("Warning: Unknown file type to download:", data_type);
		return;
	}
	let ext2 = extension.replace("txt", "krn");

	if (extension === "svg") {
		let svg = document.querySelector("svg");
		if (svg) {
			let text = svg.outerHTML.replace(/&nbsp;/g, "&#xa0;");
			let type = "image/svg+xml";
			let blob = new Blob([text], { type: type });
			let link = document.createElement("a");
			link.setAttribute("download", `${filebase}.${extension}`);
			link.href = window.URL.createObjectURL(blob);
			link.click();
		}
		return;
	}

	let url = `${this.SETTINGS.data_addr}/${this.VARS.WORK_ID}.${ext2}`;
	this.DebugMessage(`Downloading ${url} to file ${filebase}.${extension}`, "hotpink");

	if (data_type.match(/hum/i)) {
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

				let type = "text/x-humdrum";
				let blob = new Blob([text], { type: type });
				let link = document.createElement("a");
				link.setAttribute("download", `${filebase}.${extension}`);
				link.href = window.URL.createObjectURL(blob);
				link.click();
			})
			.catch(err => { console.error(err); });

	} else {
		fetch(url)
			.then(res => res.blob())
			.then(blob => {
				let link = document.createElement("a");
				link.setAttribute("download", `${filebase}.${extension}`);
				link.href = window.URL.createObjectURL(blob);
				link.click();
			})
			.catch(err => { console.error(err); });
	}
};

Object.defineProperty(POPC2.prototype.downloadData, "name", { value: "downloadData" });



