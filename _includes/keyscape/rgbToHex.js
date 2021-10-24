{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Oct  6 12:27:04 PDT 2021
// Last Modified: Wed Oct  6 12:27:07 PDT 2021
// Filename:      _includes/keyscape/rgbToHex.js
// Used by:
// Included in:   _includes/keyscape/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Convert integer RGB values into hex string.
//
{% endcomment %}

POPC2.prototype.rgbToHex = function (r, g, b) {
	this.DebugMessageFunctionVerbose(r, g, b);
	if ((r > 255) || (g > 255) || (b > 255)) {
		throw "Invalid color component";
	}
	return ((r << 16) | (g << 8) | b).toString(16);
}

Object.defineProperty(POPC2.prototype.rgbToHex, "name", { value: "rgbToHex" });



