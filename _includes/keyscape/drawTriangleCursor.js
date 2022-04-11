{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Apr  9 20:08:50 PDT 2022
// Last Modified: Sat Apr  9 20:08:52 PDT 2022
// Filename:      _includes/keyscape/drawTriangleCursor.js
// Used by:       _include/listeners/keyscapeListeners.js
// Included in:   _includes/keyscape/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Draw a triangle cursor for a keyscape.
//
{% endcomment %}

POPC2.prototype.drawTriangleCursor = function (context, xvalue, yvalue, color) {
	this.DebugMessageFunctionVerbose(context, xvalue, yvalue, color);

	if (!color) {
		color = "#000000";
	}

	let b1    = xvalue + yvalue;
	let newx1 = b1 - 300;
	let b2    = yvalue - xvalue;
	let newx2 = 300 - b2;

	context.beginPath();
	context.moveTo(newx1,  300);
	context.lineTo(xvalue, yvalue);
	context.lineTo(newx2,  300);
	context.strokeStyle = color;
	context.stroke();
};


Object.defineProperty(POPC2.prototype.drawTriangleCursor, "name", { value: "drawTriangleCursor" });



