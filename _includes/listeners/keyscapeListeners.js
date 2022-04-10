{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct 22 22:31:11 PDT 2021
// Last Modified: Sun Oct 24 06:30:33 PDT 2021
// Filename:      _includes/listeners/keyscapeListener.js
// Included in:   _includes/listeners/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Setup for keyscape display.
//
{% endcomment %}

document.addEventListener("DOMContentLoaded", function () {
	let canvas = document.querySelector("#keyscape #image");
	let cursor = document.querySelector("#keyscape #cursor");
	if (!canvas) {
		console.error("Error: cannot find keyscape canvas.");
		return;
	}
	if (!cursor) {
		console.error("Error: cannot find cursor canvas.");
		return;
	}
	let keyinfo = document.querySelector("#key-info");
	if (!keyinfo) {
		console.error("Error: cannot find keyinfo element.");
		return;
	}


	//////////////////////////////
	//
	// cursor mousemove event listener -- When hovering over the keyscape,
	//    print the color-to-key mapping of the selected position in the plot.
	//    Also draw a triangular cursor that shows the range of music that the
	//    selected point represents.
	//

	cursor.addEventListener("mousemove", function (event) {

		let position = popc2.findPos(cursor);
		let mouseX = event.pageX - position.x;
		let mouseY = event.pageY - position.y;
		popc2.VARS.KEYSCAPE.MOUSE_X = mouseX;
		popc2.VARS.KEYSCAPE.MOUSE_Y = mouseY;
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
		context2.clearRect(0, 0, cursor.width, cursor.height);

		popc2.VARS.KEYSCAPE.CURSOR_CONTEXT = context2;
		if (!good) {
			if (popc2.VARS.KEYSCAPE.FREEZE) {
				// show selected measure range
				let mousex = popc2.VARS.KEYSCAPE.SELECT_MOUSE_X;
				let mousey = popc2.VARS.KEYSCAPE.SELECT_MOUSE_Y;
				popc2.drawTriangleCursor(context2, mousex, mousey, "#aaaaaa");
			}
			if (!popc2.VARS.KEYSCAPE.FREEZE) {
				let element = document.querySelector("#measure-info");
				if (element) {
					element.innerHTML = "";
				}
			}
			return;
		}

		popc2.drawTriangleCursor(context2, mouseX, mouseY, "#000000");

		if (popc2.VARS.KEYSCAPE.FREEZE) {
			// show selected measure range
			let mousex = popc2.VARS.KEYSCAPE.SELECT_MOUSE_X;
			let mousey = popc2.VARS.KEYSCAPE.SELECT_MOUSE_Y;
			popc2.drawTriangleCursor(context2, mousex, mousey, "#aaaaaa");
		}

		if (!popc2.VARS.KEYSCAPE.FREEZE) {
			// show update measure range if not freezing display to show selected measures.

			let b1    = mouseX + mouseY;
			let newx1 = b1 - 300;
			let b2    = mouseY - mouseX;
			let newx2 = 300 - b2;

			popc2.printMeasureInfo(newx1, newx2);
			return;
		}
	});

	cursor.addEventListener("click", popc2.keyscapeClickEvent);

	let imgElement = document.querySelector("#keyscape img");
	if (!imgElement) {
		console.error("Error: cannot find keyscape img element.");
		return;
	}
	// Allow the cross-origin image to be loaded into the canvas:
	imgElement.crossOrigin = "Anonymous";
	imgElement.addEventListener("load", popc2.keyscapeImageLoadEvent);


	// Pass mousemove events on the info-overlay to the canvas partially
	// underneath it.
	let elem = document.querySelector("#keyscape #info-overlay");
	if (elem) {
		elem.addEventListener("mousemove", function (event) {
			event.preventDefault();
			event.stopImmediatePropagation();
			cursor.dispatchEvent(new MouseEvent(event.type, event));
		});
	}

});



