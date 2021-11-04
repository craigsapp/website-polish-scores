{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Wed Nov  3 19:32:27 PDT 2021
// Last Modified: Wed Nov  3 19:32:29 PDT 2021
// Filename:      _includes/browse/addAnalysisOptions.js
// Used by:
// Included in:   _includes/browse/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Calculate analysis filter and add to HNP options.
//
{% endcomment %}

POPC2.prototype.addAnalysisOptions = function (options) {
	this.DebugMessageFunction();

	let filter = this.getAnalysisFilter();
console.warn("FILTER FOUND HERE IS", filter);
	if (!filter) {
		return options;
	}

	if (options.filter) {
		options.filter.push(filter);
	} else {
		options.fiter = [ filter ];
	}

console.warn("OPTIONS AFTER ADDING ANALYSIS ONES", options);

	return options;
};

Object.defineProperty(POPC2.prototype.addAnalysisOptions, "name", { value: "addAnalysisOptions" });



