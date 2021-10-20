{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Sat Oct  9 12:14:08 PDT 2021
// Last Modified: Sat Oct  9 12:14:11 PDT 2021
// Filename:      _includes/initialize/DebugMessageFunctionVerbose.js
// Used by:       POPC2 prototype functions that are used often
// Included in:   _includes/initialize/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Print the name of the function that called this function,
//                coloring the console message in green.
//
//
{% endcomment %}

POPC2.prototype.DebugMessageFunctionVerbose = function () {
	if (this.SETTINGS.debug_verbose === "true") {
		let functionName = "";
		if (arguments.callee.caller.name) {
			functionName = arguments.callee.caller.name;
		} else {
			let matches = arguments.callee.caller.toString().match(/^function\s+([A-Z\d_]+)/i);
			if (!matches) {
				// need to find a way of getting a prototype function name...
				matches = arguments.callee.caller.toString().match(/this.([A-Z\d_]+)/i);
			}
			if (!matches) {
				return;
			}
			functionName = matches[1];
		}
		if (arguments.length == 0) {
			console.log(`%cEntering %c${functionName}%c()`,
					"color: gray", "color: chartreuse", "color: gray");
		} else {
			// also print arguments
			let args = "(";
			for (let i=0; i<arguments.length; i++) {
				if (typeof arguments[i] === "number") {
					args += arguments[i];
				} else if (typeof arguments[i] === "string") {
					args += `"${arguments[i]}"`;
				} else if (!arguments[i]) {
					args += "null";
				} else if (Array.isArray(arguments[i])) {
					args += "[array]";
				} else {
					args += "[obj]";
				}
				if (i < arguments.length - 1) {
					args += ", ";
				}
				args += ")";
				console.log(`%cEntering %c${functionName}%c${args}`,
						"color: gray", "color: chartreuse", "color: gray");
			}
		}
	}
};

Object.defineProperty(POPC2.prototype.DebugMessageFunctionVerbose, "name", { value: "DebugMessageFunctionVerbose" });



