{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Nov  3 19:15:27 PDT 2021
// Last Modified: Tue Jan 16 00:14:36 PST 2024
// Filename:      _includes/analysis/doAnalysis.js
// Used by:
// Included in:   _includes/analysis/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Get the selected analysis' filter.
//
{% endcomment %}

POPC2.prototype.doAnalysis = function (reverse) {
	this.DebugMessageFunction();

	let analysisSelectElement = document.querySelector("#analysis-select");
	if (!analysisSelectElement) {
		return;
	}

	if (analysisSelectElement) {
		// Do analyses that are not related to altering the score:
		let value = analysisSelectElement.value;
		if (value === "lyrics") {
			this.displayLyricsTool();
			return;
		}
		if (value === "prange") {
			this.displayPitchRangeTool();
			return;
		}
	}

	if (reverse) {
		// This function will run displayScore(), but displayScore() can also
		// trigger this function.  Avoid a recursive loop by passing reverse=true
		// to this function (from the displayScore() function.
		return;
	}

	// Do analyses that alter the score (these are
	// handled by displayScore():
	this.displayScore();
};

Object.defineProperty(POPC2.prototype.doAnalysis, "name", { value: "doAnalysis" });



