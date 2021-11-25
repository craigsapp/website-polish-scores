{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Nov 12 21:19:01 PST 2021
// Last Modified: Fri Nov 12 21:19:03 PST 2021
// Filename:      _includes/search/getWorkPageSearchOptions.js
// Used by:
// Included in:   _includes/search/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Extract work page search options from webpage.
//
{% endcomment %}

POPC2.prototype.getWorkPageSearchOptions = function (options) {
	this.DebugMessageFunction();

	let chordElement = document.querySelector("#search-chord-button-up");
	if (!chordElement.classList.contains("hidden")) {
		// Search top note of chords
		let topFilter = "chord -d";
		if (options.filter) {
			options.filter.push(topFilter);
		} else {
			options.filter = [topFilter];
		}
	} else {
		// Search bottom note of chords
		let downFilter = "chord -u";
		if (options.filter) {
			options.filter.push(downFilter);
		} else {
			options.filter = [downFilter];
		}
	}

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



