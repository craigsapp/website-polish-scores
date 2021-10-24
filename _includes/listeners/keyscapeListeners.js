{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct 22 22:31:11 PDT 2021
// Last Modified: Fri Oct 22 22:31:14 PDT 2021
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
	let keyinfo = document.querySelector("#keyinfo");
	if (!keyinfo) {
		console.error("Error: cannot find keyinfo element.");
		return;
	}
	let offset = 15;
	keyinfo.style.position = "absolute";
	keyinfo.style.display = "inline-block";
	keyinfo.style.left = parseInt(canvas.getBoundingClientRect().left + offset) + 'px';
	keyinfo.style.top  = parseInt(canvas.getBoundingClientRect().top  + offset) + 'px';

	cursor.onmousemove = function (event) {
		event.preventDefault();
		event.stopPropagation();


		let position = popc2.findPos(cursor);
		let x = event.pageX - position.x;
		let y = event.pageY - position.y;
		let context = canvas.getContext('2d');
		let p = context.getImageData(x, y, 1, 1).data;
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
			return;
		}

		let offsetX = parseInt(popc2.getFullLeftOffset(cursor));
		let offsetY = parseInt(popc2.getFullTopOffset(cursor));

		mouseX = parseInt(event.clientX - offsetX);
		mouseY = parseInt(event.clientY - offsetY);

		let b = mouseY - mouseX;
		let newx = 300 - b;

		let b2 = mouseX + mouseY;
		let newx2 = b2 - 300;

		context2.clearRect(0, 0, cursor.width, cursor.height);
		context2.beginPath();
		context2.moveTo(mouseX ,mouseY);
		context2.lineTo(newx, 300);
		context2.moveTo(mouseX,mouseY);
		context2.lineTo(newx2,300);
		context2.stroke();

	};

	let imgElement = document.querySelector("#keyscape img");
	if (!imgElement) {
		console.error("Error: cannot find keyscape img element.");
		return;
	}
	imgElement.crossOrigin = "Anonymous";

	imgElement.onload = function () {
		let width = imgElement.width;
		let height = imgElement.height;
		if (width == 0)  { width  = 600; }
		if (height == 0) { height = 311; }
		let canvas = document.querySelector("#keyscape #image");
		if (!canvas) {
			console.error("Error: cannot find keyscape canvas.");
			return;
		}
		canvas.width = width;
		canvas.height = height;
		let context = canvas.getContext("2d");
		context.drawImage(imgElement, 0, 0);

		let cursor = document.querySelector("#keyscape #cursor");
		if (!cursor) {
			console.error("Error: cannot find keyscape cursor.");
			return;
		}
		cursor.width = width;
		cursor.height = height;

	};

});



