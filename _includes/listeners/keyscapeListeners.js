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
		if (!good) {
			context2.clearRect(0, 0, cursor.width, cursor.height);
			let element = document.querySelector("#measure-info");
			if (element) {
				element.innerHTML = "";
			}
			return;
		}

		let b1 = mouseX + mouseY;
		let newx1 = b1 - 300;

		let b2 = mouseY - mouseX;
		let newx2 = 300 - b2;

		context2.clearRect(0, 0, cursor.width, cursor.height);
		context2.beginPath();
		context2.moveTo(newx1,300);
		context2.lineTo(mouseX,mouseY);
		context2.lineTo(newx2, 300);
		context2.stroke();

		popc2.printMeasureInfo(newx1, newx2);
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
			console.warn("MOUSEOVER EVENT FOR INFO-OVERLAY", event);
			event.preventDefault();
			event.stopImmediatePropagation();
			cursor.dispatchEvent(new MouseEvent(event.type, event));
		});
	}

});



