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
	let canvas = document.querySelector("#keyscape canvas");
	if (!canvas) {
		console.error("Error: cannot find keyscape canvas.");
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

	canvas.onmousemove = function (event) {
		let position = popc2.findPos(canvas);
		canvas.style.cursor = 'crosshair';
		let x = event.pageX - position.x;
		let y = event.pageY - position.y;
		let context = canvas.getContext('2d');
		let p = context.getImageData(x, y, 1, 1).data;
		let hex = "#" + ("000000" + popc2.rgbToHex(p[0], p[1], p[2])).slice(-6);
		let good = popc2.printKeyInfo(keyinfo, hex);
		if (good) {
			canvas.style.cursor = 'crosshair';
		} else {
			canvas.style.cursor = 'auto';
		}
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
		if (height == 0) { height = 461; }
		let canvas = document.querySelector("#keyscape canvas");
		if (!canvas) {
			console.error("Error: cannot find keyscape canvas.");
			return;
		}
		canvas.width = width;
		canvas.height = height;
		let ctx = canvas.getContext("2d");
		ctx.drawImage(imgElement, 0, 0);
	};

});



