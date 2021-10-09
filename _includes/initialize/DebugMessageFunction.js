{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Oct  8 00:53:37 PDT 2021
// Last Modified: Fri Oct  8 00:53:40 PDT 2021
// Filename:      _includes/initialize/DebugMessageFunction.js
// Used by:
// Included in:
// Syntax:        ECMAScript 6; Jekyll/Liquid
// vim:           ts=3:nowrap
//
// Description:   Print the name of the function that called this function,
//                coloring the console message in green.
//
//
{% endcomment %}

POPC2.prototype.DebugMessageFunction = function () {
	{% if site.debug == "true" %}
		let matches = arguments.callee.caller.toString().match(/^function\s+([A-Z\d_]+)/i);
		if (!matches) {
			// need to find a way of getting a prototype function name...
			matches = arguments.callee.caller.toString().match(/this.([A-Z\d_]+)/i);
		}
		if (!matches) {
			return;
		}
		if (arguments.length == 0) {
			console.log(`%cEntering %c${matches[1]}%c()`,
					"color: gray", "color: green", "color: gray");
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
				} else if (Array.isArray(argments[i])) {
					args += "[array]";
				} else {
					args += "[obj]";
				}
				if (i < arguments.length - 1) {
					args += ", ";
				}
				args += ")";
				console.log(`%cEntering %c${matches[1]}%c${args}`,
						"color: gray", "color: green", "color: gray");
			}
		}
	{% endif %}
};



