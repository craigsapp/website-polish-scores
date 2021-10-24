{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct 22 21:58:53 PDT 2021
// Last Modified: Fri Oct 22 21:58:56 PDT 2021
// Filename:      _includes/keyscape/findPos.js
// Used by:
// Included in:   _includes/keyscape/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Return the coordinate of the mouse in the keyscape image.
//
{% endcomment %}

POPC2.prototype.findPos = function (element) {
	this.DebugMessageFunctionVerbose();
	let current_left = 0;
	let current_top  = 0;
	if (element.offsetParent) {
		do {
			current_left += element.offsetLeft;
			current_top  += element.offsetTop;
		} while (element = element.offsetParent);
		return {x: current_left, y: current_top};
	}
	return undefined;
}

Object.defineProperty(POPC2.prototype.findPos, "name", { value: "findPos" });



