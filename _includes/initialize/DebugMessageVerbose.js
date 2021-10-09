{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct  8 00:56:06 PDT 2021
// Last Modified: Fri Oct  8 00:56:08 PDT 2021
// Filename:      _includes/initialize/DebugMessageVerbose.js
// Used by:       Various POPC2 prototype functions (none yet)
// Included in:   _includes/initialize/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Print a debug message, but only if _config.yml has the
//                debug_verbose variable set to the string "true".  A color
//                for the message can be given optionally as a second parameter.
//
//
{% endcomment %}

POPC2.prototype.DebugMessageVerbose = function (text, color) {
	if (this.SETTINGS.debug_verbose === "true") {
		if (color) {
			console.log(`%c${text}`, "color: " + color);
		} else {
			console.log(text);
		}
	}
};

Object.defineProperty(POPC2.prototype.DebugMessageVerbose, "name", { value: "DebugMessageVerbose" });



