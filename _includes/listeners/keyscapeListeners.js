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

	popc2.VARS.KEYSCAPE.KEYINFO_ELEMENT = keyinfo;
	popc2.VARS.KEYSCAPE.CANVAS = canvas;
	popc2.VARS.KEYSCAPE.CONTEXT = canvas.getContext("2d");
	popc2.VARS.KEYSCAPE.CURSOR_CANVAS = cursor;
	popc2.VARS.KEYSCAPE.CURSOR_CONTEXT = cursor.getContext("2d");

	cursor.addEventListener("mousemove", popc2.keyscapeMouseMoveEvent);
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



