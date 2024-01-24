{% comment %}
//
// Programmer:    Craig Stuart Sapp <craig@ccrma.stanford.edu>
// Creation Date: Fri Nov 12 21:19:01 PST 2021
// Last Modified: Fri Nov 12 21:19:03 PST 2021
// Filename:      _includes/search/addWorkPageSearchOptions.js
// Used by:
// Included in:   _includes/search/main.html
// Syntax:        ECMAScript 6
// vim:           ts=3:nowrap
//
// Description:   Extract work page search options from webpage.
//
{% endcomment %}

POPC2.prototype.addWorkPageSearchOptions = function (options) {
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

	let msearchFilter = "";

	let pitchElement = document.querySelector("#work-search-pitch");
	let pitchQuery = pitchElement.value || "";
	if (pitchQuery) {
		msearchFilter += ` -p '${pitchQuery}'`;
	}

	let intervalElement = document.querySelector("#work-search-interval");
	let intervalQuery = intervalElement.value || "";
	if (intervalQuery) {
		msearchFilter += ` -i '${intervalQuery}'`;
	}

	if (!msearchFilter.match(/^\s*$/)) {
		msearchFilter = `msearch ${msearchFilter}`;
		if (options.filter) {
			options.filter.push(msearchFilter);
		} else{
			options.filter = [msearchFilter];
		}
	}

	let minusElement = document.querySelector("#search-zoom-button-minus");
	if (!minusElement.classList.contains("hidden")) {
		let zfilter = "myank --marks --double";
		if (options.filter) {
			options.filter.push(zfilter);
		} else{
			options.filter = [zfilter];
		}
	}

	return options;
};

Object.defineProperty(POPC2.prototype.addWorkPageSearchOptions, "name", { value: "addWorkPageSearchOptions" });



