{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Nov  3 19:15:27 PDT 2021
// Last Modified: Wed Nov  3 19:15:30 PDT 2021
// Filename:      _includes/browse/doAnalysis.js
// Used by:
// Included in:   _includes/analysis/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Get the selected analysis' filter.
//
{% endcomment %}

POPC2.prototype.doAnalysis = function () {
	this.DebugMessageFunction();

	this.displayScore();

};

Object.defineProperty(POPC2.prototype.doAnalysis, "name", { value: "doAnalysis" });



