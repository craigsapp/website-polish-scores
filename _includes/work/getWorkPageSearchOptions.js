{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Nov 12 21:19:01 PST 2021
// Last Modified: Fri Nov 12 21:19:03 PST 2021
// Filename:      _includes/work/getWorkPageSearchOptions.js
// Used by:
// Included in:   _includes/work/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Store the work ID of the currently displayed score and
//                record the score in the work display history.
//
{% endcomment %}

POPC2.prototype.getWorkPageSearchOptions = function (options) {
	this.DebugMessageFunction();
	let pitchElement = document.querySelector("#work-search-pitch");
	let pitchQuery = pitchElement.value || "";
	if (pitchQuery) {
		let pfilter = `msearch -p '${pitchQuery}'`;
		if (options.filter) {
			options.filter.push(pfilter);
		} else{
			options.filter = [pfilter];
		}
	}
	return options;
};

Object.defineProperty(POPC2.prototype.getWorkPageSearchOptions, "name", { value: "getWorkPageSearchOptions" });



