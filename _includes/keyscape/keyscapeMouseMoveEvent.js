{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Mon Oct 25 09:09:26 PDT 2021
// Last Modified: Mon Oct 25 09:09:29 PDT 2021
// Filename:      _includes/keyscape/keyscapeClickEvent.html
// Used by:       _includes/listeners/keyscapeListeners.js
// Included in:   _includes/keyscape/main.html
// Syntax:        ECMAScript 6; Jekyll/Liquid
// vim:           ts=3:nowrap
//
// Description:   When hovering over the keyscape, print the
//                color-to-key mapping of the selected position
//                in the plot.  Also draw a triangular cursor
//                that shows the range of music that the selected
//                point represents.
//
{% endcomment %}

POPC2.prototype.keyscapeMouseMoveEvent = function (event) {
	popc2.DebugMessageFunctionVerbose();

	let canvas = popc2.VARS.KEYSCAPE.CANVAS;
	if (!canvas) {
		console.error("NO KEYSCAPE CANVAS FOUND");
		return;
	}

	let cursor = popc2.VARS.KEYSCAPE.CURSOR_CANVAS;
	if (!cursor) {
		console.error("NO CURSOR CANVAS FOUND FOR KEYSCAPE");
		return;
	}

	let keyinfo = popc2.VARS.KEYSCAPE.KEYINFO_ELEMENT;
	if (!keyinfo) {
		console.error("No #keyinfo element found");
		return;
	}

	let mouseX;
	let mouseY;
	if (event) {
		let position = popc2.findPos(cursor);
		mouseX = event.pageX - position.x;
		mouseY = event.pageY - position.y;
		popc2.VARS.KEYSCAPE.MOUSE_X = mouseX;
		popc2.VARS.KEYSCAPE.MOUSE_Y = mouseY;
	} else {
		mouseX = popc2.VARS.KEYSCAPE.MOUSE_X;
		mouseY = popc2.VARS.KEYSCAPE.MOUSE_Y;
	}

	let context = canvas.getContext('2d');
	let p = context.getImageData(mouseX, mouseY, 1, 1).data;
	let hex = "#" + ("000000" + popc2.rgbToHex(p[0], p[1], p[2])).slice(-6);
	let good = popc2.printKeyInfo(keyinfo, hex);

	if (good) {
		// cursor.style.cursor = 'crosshair';
		cursor.style.cursor = 'none';
	} else {
		// cursor.style.cursor = 'auto';
		cursor.style.cursor = 'default';
	}

	let context2 = cursor.getContext('2d');
	popc2.VARS.KEYSCAPE.CURSOR_CONTEXT = context2;

	context2.clearRect(0, 0, cursor.width, cursor.height);

	if (good) {
		popc2.drawTriangleCursor(context2, mouseX, mouseY, "#000000");
	}

	let b1 = mouseX + mouseY;
	let newx1 = b1 - 300;
	let b2 = mouseY - mouseX;
	let newx2 = 300 - b2;

	if (popc2.VARS.KEYSCAPE.FREEZE) {
		// show selected measure range
		let mousex = popc2.VARS.KEYSCAPE.SELECT_MOUSE_X;
		let mousey = popc2.VARS.KEYSCAPE.SELECT_MOUSE_Y;
		popc2.drawTriangleCursor(context2, mousex, mousey, "#aaaaaa");
	}
	if (!popc2.VARS.KEYSCAPE.FREEZE) {
		let measureinfo = document.querySelector("#measure-info");
		if (measureinfo) {
			if (!good) {
				measureinfo.innerHTML = "";
			} else {
				popc2.printMeasureInfo(newx1, newx2);
			}
		}
	}
}

Object.defineProperty(POPC2.prototype.keyscapeMouseMoveEvent, "name", { value: "keyscapeMouseMoveEvent" });



