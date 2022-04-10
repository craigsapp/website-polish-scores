{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct 22 21:58:53 PDT 2021
// Last Modified: Mon Oct 25 09:19:33 PDT 2021
// Filename:      _includes/keyscape/keyscapeImageLoadEvent.js
// Used by:       _includes/listeners/keyscapeListeners.js
// Included in:   _includes/keyscape/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Load a keyscape image into the canvas.
//
{% endcomment %}

POPC2.prototype.keyscapeImageLoadEvent = function (event) {
   popc2.LoadTimemap();

	if (!event) {
		console.error("Event is empty");
		return;
	}
	let target = event.target;
	if (!target) {
		console.error("No target");
		return;
	}
	let width = target.width;
	let height = target.height;
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
	context.drawImage(target, 0, 0);
	let cursor = document.querySelector("#keyscape #cursor");
	if (!cursor) {
		console.error("Error: cannot find keyscape cursor.");
		return;
	}
	cursor.width  = width;
	cursor.height = height;

	let context2 = cursor.getContext('2d');
	popc2.VARS.KEYSCAPE.CURSOR_CONTEXT = context2;
	context2.clearRect(0, 0, cursor.width, cursor.height);

	// let mousex = popc2.VARS.KEYSCAPE.SELECT_MOUSE_X;
	// let mousey = popc2.VARS.KEYSCAPE.SELECT_MOUSE_X;
	// if ((mousex >= 0) && (mousey >= 0)) {
	// 	if (popc2.WORK_ID === popc2.KEYSCAPE.ID) {
	// 		popc2.drawTriangleCursor(context2, mousex, mousey, "#aaaaaa");
	// 	}
	// }

};

Object.defineProperty(POPC2.prototype.keyscapeImageLoadEvent, "name", { value: "keyscapeImageLoadEvent" });



