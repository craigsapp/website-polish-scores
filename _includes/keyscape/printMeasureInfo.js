{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Oct 24 06:33:33 PDT 2021
// Last Modified: Sun Oct 24 06:33:35 PDT 2021
// Filename:      _includes/keyscape/printMeasureInfo.js
// Used by:
// Included in:   _includes/keyscape/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Print the measure range selected by the cursor in the keyscape.
//
{% endcomment %}

POPC2.prototype.printMeasureInfo = function (startpx, endpx, smeasure, emeasure) {
	if (!this.VARS.KEYSCAPE.INFO) {
		return;
	}
	let id = this.VARS.WORK_ID;
	if (!id) {
		return;
	}
	if (this.VARS.KEYSCAPE.INFO[id].length != 300) {
		return;
	}

	// Keyscape is displayed in 2:1 aspect ratio, so convert to 1:1:
	let startcol = parseInt(startpx / 2)
	let endcol   = parseInt(endpx / 2)
	if (endcol >= 300) { endcol = 299; }
	if (startcol < 0)  { startcol = 0; }
	// console.warn("STARTPX", startcol, "ENDPX", endcol);

	if (typeof this.VARS.KEYSCAPE.INFO[id][startcol].startbar === "undefined") {
		return;
	}
	let startmeasure = this.VARS.KEYSCAPE.INFO[id][startcol].startbar;
	if (smeasure) {
		startmeasure = smeasure;
	}

	if (typeof this.VARS.KEYSCAPE.INFO[id][endcol].endbar === "undefined") {
		return;
	}
	let endmeasure = this.VARS.KEYSCAPE.INFO[id][endcol].endbar;
	if (emeasure) {
		endmeasure = emeasure;
	}

	let value;
	if (startmeasure === endmeasure) {
		value = `m. ${startmeasure}`;
	} else {
		value = `mm. ${startmeasure}–${endmeasure}`;
	}

	let element = document.querySelector("#measure-info");
	if (!element) {
		console.error("Error: cannot find #measure-info");
	}
	element.innerHTML = value;
}

Object.defineProperty(POPC2.prototype.printMeasureInfo, "name", { value: "printMeasureInfo" });



