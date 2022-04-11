{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sun Apr 10 19:54:24 PDT 2022
// Last Modified: Sun Apr 10 19:54:26 PDT 2022
// Filename:      _includes/keyscape/selectKeyscapeMeasure.js
// Used by:
// Included in:   _includes/keyscape/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Select a region in the keyscape (for loading measure range from URL).
//
{% endcomment %}

POPC2.prototype.selectKeyscapeMeasure = function (id, startmeasure, endmeasure) {
	this.DebugMessageFunction(id, startmeasure, endmeasure);
	if (startmeasure > endmeasure) {
		let etemp = endmeasure;
		endmeasure = startmeasure;
		startmeasure = etemp;
	}

	if (!id) {
		id = this.VARS.WORK_ID;
	}
	info = this.VARS.KEYSCAPE.INFO[id];
	if (!info) {
		return;
	}
	console.log("INFO", info, startmeasure, endmeasure);
	startindex = -1;
	endindex = -1;
	for (let i=0; i<info.length; i++) {
		if (info[i].startbar == startmeasure) {
			startindex = i;
			break;
		}
	}
	if (startindex < 0) {
		return;
	}
	for (let i=info.length-1; i>=0; i--) {
		if (info[i].endbar == endmeasure) {
			endindex = i;
			break;
		}
	}
	if (startindex < 0) {
		return;
	}

	let diffindex = endindex - startindex;
	if (diffindex < 0) {
		let etemp = endindex;
		endindex = startindex;
		startindex = etemp;
		diffindex = endindex - startindex;
	}
	if (diffindex <= 0) {
		return;
	}

	let mouseX = (startindex + diffindex / 2) * 2;
	let mouseY = 300 - diffindex;

	this.VARS.KEYSCAPE.FREEZE = 1;
	this.VARS.KEYSCAPE.ID = id;
	this.VARS.KEYSCAPE.SELECT_MOUSE_X = mouseX;
	this.VARS.KEYSCAPE.SELECT_MOUSE_Y = mouseY;
	this.VARS.KEYSCAPE.SELECT_START_MEASURE = startmeasure;
	this.VARS.KEYSCAPE.SELECT_END_MEASURE = endmeasure;

	this.VARS.KEYSCAPE.STARTMEASURE = startmeasure;
	this.VARS.KEYSCAPE.STARTMEASURE = endmeasure;

	let b1 = mouseX + mouseY;
	let newx1 = b1 - 300;
	let b2 = mouseY - mouseX;
	let newx2 = 300 - b2;
	this.printMeasureInfo(newx1, newx2);

	let context = this.VARS.KEYSCAPE.CONTEXT;
	let keyinfo = this.VARS.KEYSCAPE.KEYINFO_ELEMENT;
	let p = context.getImageData(mouseX, mouseY, 1, 1).data;
	let hex = "#" + ("000000" + popc2.rgbToHex(p[0], p[1], p[2])).slice(-6);
console.error("HEX", hex, "=================================================");
	let good = popc2.printKeyInfo(keyinfo, hex);
console.warn("GOOD", good, "KEYINFO", keyinfo);


	let context2 = this.VARS.KEYSCAPE.CURSOR_CONTEXT;
	context2.clearRect(0, 0, cursor.width, cursor.height);
	// Clear?  Probably not since nothing should be on the canvas.
	this.drawTriangleCursor(context2, mouseX, mouseY, "#aaaaaa");

};

Object.defineProperty(POPC2.prototype.selectKeyscapeMeasure, "name", { value: "selectKeyscapeMeasure" });



