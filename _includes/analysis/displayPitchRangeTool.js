{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Tue Jan 16 00:07:59 PST 2024
// Last Modified: Tue Jan 16 00:08:02 PST 2024
// Filename:      _includes/analysis/displayPitchRangeTool.js
// Used by:
// Included in:   _includes/analysis/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Get the selected analysis' filter.
//
{% endcomment %}

POPC2.prototype.displayPitchRangeTool = function (tool) {
	this.DebugMessageFunction(tool);

	this.displayAnalysisPanel("prange");

	let toolElement = document.querySelector("#prange-content");
	if (toolElement) {
		toolElement.innerHTML = "";
	} else {
		return;
	}

	let id = this.VARS.WORK_ID;
	if ((!id) || (id.match(/^\s*$/))) {
		return;
	}

	let delement = document.querySelector("#prange-duration");
	let durationQ = false;
	if (delement) {
		durationQ = delement.checked;
	}

	let felement = document.querySelector("#prange-final");
	let finalQ = false;
	if (felement) {
		finalQ = felement.checked;
	}

	let url = `${this.SETTINGS.data_addr}/${id}-prange-`;
	url += durationQ ? "duration" : "attack";
	url += finalQ ? "-final" : "";
	url += ".svg";

	this.DebugMessage("Downloading prange tool " + url, "hotpink");
	let that = this;
	fetch(url)
		.then(response => response.text())
		.then(svgText => {
			if (svgText.match(/^\s*$/)) {
				console.error(`ERROR: Problem downloading ${url}.  Content was empty:`);
				console.log(text);
				return;
			}
			toolElement.innerHTML = svgText;
		})
		.catch(err => { console.error('Error downloading PitchRange tool:', err)});

};

Object.defineProperty(POPC2.prototype.displayPitchRangeTool, "name", { value: "displayPitchRangeTool" });



