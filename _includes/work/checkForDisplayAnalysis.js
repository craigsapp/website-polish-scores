{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Aug 31 14:26:59 CEST 2022
// Last Modified: Wed Aug 31 14:27:02 CEST 2022
// Filename:      _includes/work/checkForDisplayAnalysis.js
// Used by:       
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Check if analysis tool should be
//                automatically displayed.
//
{% endcomment %}

POPC2.prototype.checkForDisplayAnalysis = function () {
	this.DebugMessageFunction();

	if (!this.VARS.CGI.analysis) {
		console.warn("NO ANALYSIS PARAMETER");
		return;
	}

	let tag = this.VARS.CGI.analysis;
	let options = "";
	let matches = tag.match(/^\s*([^\s]+)\s+(.*)\s*$/);
	if (matches) {
		tag = matches[1];
		options = matches[2];
	}

	delete this.VARS.CGI.analysis;

	let selector = `select#analysis-select`;
	let element = document.querySelector(selector);
	if (!element) {
		console.warn("CANNOT FIND ELEMENT", selector);
		return;
	}

	let selector2 = `#analysis-${tag}`;
	let element2 = document.querySelector(selector2);
	if (!element2) {
		console.warn("CANNOT FIND ELEMENT", selector2);
		return;
	}

	element.value = tag;

	if (tag === "lyrics") {
		if (options.match(/m/i)) {
			let element = document.querySelector("input#lyrics-modern");
			if (element) {
				element.checked = true;
			}
		}
	}

	this.toggleToolDisplay("analysis");

};

Object.defineProperty(POPC2.prototype.checkForDisplayAnalysis, "name", { value: "checkForDisplayAnalysis" });



