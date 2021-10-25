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
	let keyinfo = document.querySelector("#keyinfo");
	if (!keyinfo) {
		console.error("Error: cannot find keyinfo element.");
		return;
	}
	let minfo = document.querySelector("#measureinfo");
	if (!minfo) {
		console.error("Error: cannot find keyscape measure info element.");
		return;
	}

	let rect = canvas.getBoundingClientRect();

	let xoffset = 160;
	let yoffset = 55;
	keyinfo.style.position = "absolute";
	keyinfo.style.display = "inline-block";
	keyinfo.style.left = parseInt(rect.left + xoffset) + 'px';
	keyinfo.style.top  = parseInt(rect.top  + yoffset) + 'px';

	let yoffset2 = yoffset + 40;
	minfo.style.position = "absolute";
	minfo.style.display = "inline-block";
	minfo.style.left = parseInt(rect.left + xoffset) + 'px';
	minfo.style.top  = parseInt(rect.top  + yoffset2) + 'px';

	cursor.onmousemove = function (event) {
		event.preventDefault();
		event.stopPropagation();

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
			let element = document.querySelector("#measureinfo");
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



